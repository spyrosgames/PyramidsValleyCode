using UnityEngine;
using System.Collections;

public class NGUIPlayerMoveController : MonoBehaviour {

// Objects to drag in
public MovementMotor motor;
public Transform character;
public GameObject cursorPrefab;
public GameObject joystickPrefab;

// Settings
public float cameraSmoothing = 0.01f;
public float cameraPreview = 2.0f;

// Cursor settings
public float cursorPlaneHeight = 0.0f;
public float cursorFacingCamera = 0.0f;
public float cursorSmallerWithDistance = 0.0f;
public float cursorSmallerWhenClose = 1.0f;

// Private memeber data
private Camera mainCamera;

private Transform cursorObject;
	
private UIJoystick joystickLeft;
private UIJoystick joystickRight;

private Transform mainCameraTransform;
private Vector3 cameraVelocity = Vector3.zero;
private Vector3 cameraOffset = Vector3.zero;
private Vector3 initOffsetToPlayer;

// Prepare a cursor point varibale. This is the mouse position on PC and controlled by the thumbstick on mobiles.
private Vector3 cursorScreenPosition;

private Plane playerMovementPlane;

public GameObject joystickRightGO;
public GameObject joystickLeftGO;

private Quaternion screenMovementSpace;
private Vector3 screenMovementForward;
private Vector3 screenMovementRight;

public GameObject gesturesLockRightTexture;
public GameObject gesturesLockLeftTexture;

private GUITexture gesturesLockLeftTextureGUITexture;
private GUITexture gesturesLockRightTextureGUITexture;

private GUITexture joystickLeftGOGUITexture;
private GUITexture joystickRightGOGUITexture;

void Awake () {		
	motor.movementDirection = Vector2.zero;
	motor.facingDirection = Vector2.zero;
	
	// Set main camera
	mainCamera = Camera.main;
	mainCameraTransform = mainCamera.transform;
	
	// Ensure we have character set
	// Default to using the transform this component is on
	if (!character)
		character = transform;
	
	initOffsetToPlayer = mainCameraTransform.position - character.position;
	
	#if UNITY_IPHONE || UNITY_ANDROID
		if (joystickPrefab) {
			// Create left joystick
			//joystickLeftGO = Instantiate (joystickPrefab) as GameObject;
			joystickLeftGO.SetActiveRecursively(true);
			joystickLeftGO.name = "Joystick Left";
			joystickLeft = joystickLeftGO.GetComponent<UIJoystick> ();

			// Create right joystick
			//joystickRightGO = Instantiate (joystickPrefab) as GameObject;
			joystickRightGO.SetActiveRecursively(true);
			joystickRightGO.name = "Joystick Right";
			joystickRight = joystickRightGO.GetComponent<UIJoystick> ();	
			
			/*
			joystickLeftGOGUITexture = joystickLeftGO.GetComponent<GUITexture>();
			joystickRightGOGUITexture = joystickRightGO.GetComponent<GUITexture>();
			
			
			gesturesLockLeftTexture.transform.parent = joystickLeftGO.transform;
			gesturesLockRightTexture.transform.parent = joystickRightGO.transform;
			
			
			gesturesLockLeftTextureGUITexture = gesturesLockLeftTexture.GetComponent<GUITexture>();
			gesturesLockRightTextureGUITexture = gesturesLockRightTexture.GetComponent<GUITexture>();
			 */
			
			/*
			gesturesLockLeftTextureGUITexture.pixelInset.width = 190;
			gesturesLockLeftTextureGUITexture.pixelInset.height = 160;

			gesturesLockRightTextureGUITexture.pixelInset.width = 190;
			gesturesLockRightTextureGUITexture.pixelInset.height = 160;
			*/
			/*
			gesturesLockLeftTextureGUITexture.pixelInset.width = Screen.width * 0.4f;
			gesturesLockLeftTextureGUITexture.pixelInset.height = Screen.height * 0.45f;

			gesturesLockRightTextureGUITexture.pixelInset.width = Screen.width * 0.4f;
			gesturesLockRightTextureGUITexture.pixelInset.height = Screen.height * 0.45f;
			*/
		}
	#else
		if (cursorPrefab) {
			cursorObject = (Instantiate (cursorPrefab) as GameObject).transform;
		}
	#endif
	
	// Save camera offset so we can use it in the first frame
	cameraOffset = mainCameraTransform.position - character.position;
	
	// Set the initial cursor position to the center of the screen
	cursorScreenPosition = new Vector3 (0.5f * Screen.width, 0.5f * Screen.height, 0.0f);
	
	// caching movement plane
	playerMovementPlane = new Plane (character.up, character.position + character.up * cursorPlaneHeight);
}

void Start () {
	#if UNITY_IPHONE || UNITY_ANDROID
		// Move to right side of screen
		/*
		GUITexture guiTex = joystickRightGO.GetComponent<GUITexture> ();
		guiTex.pixelInset.x = Screen.width - guiTex.pixelInset.x - guiTex.pixelInset.width;
		*/		
	#endif	
	
	// it's fine to calculate this on Start () as the camera is static in rotation
	
	screenMovementSpace = Quaternion.Euler (0.0f, mainCameraTransform.eulerAngles.y, 0.0f);
	screenMovementForward = screenMovementSpace * Vector3.forward;
	screenMovementRight = screenMovementSpace * Vector3.right;	
}

void OnDisable () {
	if (joystickLeft) 
		joystickLeft.enabled = false;
	
	if (joystickRight)
		joystickRight.enabled = false;
}

void OnEnable () {
	if (joystickLeft) 
		joystickLeft.enabled = true;
	
	if (joystickRight)
		joystickRight.enabled = true;
}

void Update () {
	// HANDLE CHARACTER MOVEMENT DIRECTION
	#if UNITY_IPHONE || UNITY_ANDROID
		motor.movementDirection = joystickLeft.position.x * screenMovementRight + joystickLeft.position.y * screenMovementForward;
		
	#else
		motor.movementDirection = Input.GetAxis ("Horizontal") * screenMovementRight + Input.GetAxis ("Vertical") * screenMovementForward;
	#endif
	
	// Make sure the direction vector doesn't exceed a length of 1
	// so the character can't move faster diagonally than horizontally or vertically
	if (motor.movementDirection.sqrMagnitude > 1.0f)
		motor.movementDirection.Normalize();
	
	
	// HANDLE CHARACTER FACING DIRECTION AND SCREEN FOCUS POINT
	
	// First update the camera position to take into account how much the character moved since last frame
	//mainCameraTransform.position = Vector3.Lerp (mainCameraTransform.position, character.position + cameraOffset, Time.deltaTime * 45.0f * deathSmoothoutMultiplier);
	
	// Set up the movement plane of the character, so screenpositions
	// can be converted into world positions on this plane
	//playerMovementPlane = new Plane (Vector3.up, character.position + character.up * cursorPlaneHeight);
	
	// optimization (instead of newing Plane):
	
	playerMovementPlane.normal = character.up;
	playerMovementPlane.distance = -character.position.y + cursorPlaneHeight;
	
	// used to adjust the camera based on cursor or joystick position
	
	Vector3 cameraAdjustmentVector = Vector3.zero;
	
	#if UNITY_IPHONE || UNITY_ANDROID
	
		// On mobiles, use the thumb stick and convert it into screen movement space
		motor.facingDirection = joystickRight.position.x * screenMovementRight + joystickRight.position.y * screenMovementForward;

		//cameraAdjustmentVector = motor.facingDirection;		
	
	#else
	
		#if !UNITY_EDITOR && (UNITY_XBOX360 || UNITY_PS3)

			// On consoles use the analog sticks
			var axisX : float = Input.GetAxis("LookHorizontal");
			var axisY : float = Input.GetAxis("LookVertical");
			motor.facingDirection = axisX * screenMovementRight + axisY * screenMovementForward;
	
			cameraAdjustmentVector = motor.facingDirection;		
		
		#else
	
			// On PC, the cursor point is the mouse position
			var cursorScreenPosition : Vector3 = Input.mousePosition;
						
			// Find out where the mouse ray intersects with the movement plane of the player
			var cursorWorldPosition : Vector3 = ScreenPointToWorldPointOnPlane (cursorScreenPosition, playerMovementPlane, mainCamera);
			
			var halfWidth : float = Screen.width / 2.0f;
			var halfHeight : float = Screen.height / 2.0f;
			var maxHalf : float = Mathf.Max (halfWidth, halfHeight);
			
			// Acquire the relative screen position			
			var posRel : Vector3 = cursorScreenPosition - Vector3 (halfWidth, halfHeight, cursorScreenPosition.z);		
			posRel.x /= maxHalf; 
			posRel.y /= maxHalf;
						
			cameraAdjustmentVector = posRel.x * screenMovementRight + posRel.y * screenMovementForward;
			cameraAdjustmentVector.y = 0.0;	
									
			// The facing direction is the direction from the character to the cursor world position
			motor.facingDirection = (cursorWorldPosition - character.position);
			motor.facingDirection.y = 0;			
			
			// Draw the cursor nicely
			HandleCursorAlignment (cursorWorldPosition);
			
		#endif
		
	#endif
		
	// HANDLE CAMERA POSITION
		
	// Set the target position of the camera to point at the focus point
	Vector3 cameraTargetPosition = character.position + initOffsetToPlayer + cameraAdjustmentVector * cameraPreview;
	
	// Apply some smoothing to the camera movement
	//mainCameraTransform.position = Vector3.SmoothDamp (mainCameraTransform.position, cameraTargetPosition, ref cameraVelocity, cameraSmoothing);	
	mainCameraTransform.position = Vector3.SmoothDamp (mainCameraTransform.position, new Vector3(Mathf.Clamp(cameraTargetPosition.x, 10, 120), cameraTargetPosition.y, Mathf.Clamp(cameraTargetPosition.z, -590.0f, 590.0f)), ref cameraVelocity, cameraSmoothing);	
	//mainCameraTransform.position = Vector3.SmoothDamp (mainCameraTransform.position, new Vector3(Mathf.Clamp(cameraTargetPosition.x, 10, 120), cameraTargetPosition.y, cameraTargetPosition.z), ref cameraVelocity, cameraSmoothing);	
	
	// Save camera offset so we can use it in the next frame
	cameraOffset = mainCameraTransform.position - character.position;
}

public static Vector3 PlaneRayIntersection (Plane plane, Ray ray){
	float dist = 0.0f;
	plane.Raycast (ray, out dist);
	return ray.GetPoint (dist);
}

public static Vector3 ScreenPointToWorldPointOnPlane (Vector3 screenPoint, Plane plane, Camera camera){
	// Set up a ray corresponding to the screen position
	Ray ray = camera.ScreenPointToRay (screenPoint);
	
	// Find out where the ray intersects with the plane
	return PlaneRayIntersection (plane, ray);
}

void HandleCursorAlignment (Vector3 cursorWorldPosition) {
	if (!cursorObject)
		return;
	
	// HANDLE CURSOR POSITION
	
	// Set the position of the cursor object
	cursorObject.position = cursorWorldPosition;
	
	// Hide mouse cursor when within screen area, since we're showing game cursor instead
	Screen.showCursor = (Input.mousePosition.x < 0 || Input.mousePosition.x > Screen.width || Input.mousePosition.y < 0 || Input.mousePosition.y > Screen.height);
	
	
	// HANDLE CURSOR ROTATION
	
	Quaternion cursorWorldRotation = cursorObject.rotation;
	if (motor.facingDirection != Vector3.zero)
		cursorWorldRotation = Quaternion.LookRotation (motor.facingDirection);
	
	// Calculate cursor billboard rotation
	Vector3 cursorScreenspaceDirection = Input.mousePosition - mainCamera.WorldToScreenPoint (transform.position + character.up * cursorPlaneHeight);
	cursorScreenspaceDirection.z = 0;
	Quaternion cursorBillboardRotation = mainCameraTransform.rotation * Quaternion.LookRotation (cursorScreenspaceDirection, -Vector3.forward);
	
	// Set cursor rotation
	cursorObject.rotation = Quaternion.Slerp (cursorWorldRotation, cursorBillboardRotation, cursorFacingCamera);
	
	
	// HANDLE CURSOR SCALING
	
	// The cursor is placed in the world so it gets smaller with perspective.
	// Scale it by the inverse of the distance to the camera plane to compensate for that.
	float compensatedScale = 0.1f * Vector3.Dot (cursorWorldPosition - mainCameraTransform.position, mainCameraTransform.forward);
	
	// Make the cursor smaller when close to character
	float cursorScaleMultiplier = Mathf.Lerp (0.7f, 1.0f, Mathf.InverseLerp (0.5f, 4.0f, motor.facingDirection.magnitude));
	
	// Set the scale of the cursor
	cursorObject.localScale = Vector3.one * Mathf.Lerp (compensatedScale, 1.0f, cursorSmallerWithDistance) * cursorScaleMultiplier;
	
	// DEBUG - REMOVE LATER
	if (Input.GetKey(KeyCode.O)) cursorFacingCamera += Time.deltaTime * 0.5f;
	if (Input.GetKey(KeyCode.P)) cursorFacingCamera -= Time.deltaTime * 0.5f;
	cursorFacingCamera = Mathf.Clamp01(cursorFacingCamera);
	
	if (Input.GetKey(KeyCode.K)) cursorSmallerWithDistance += Time.deltaTime * 0.5f;
	if (Input.GetKey(KeyCode.L)) cursorSmallerWithDistance -= Time.deltaTime * 0.5f;
	cursorSmallerWithDistance = Mathf.Clamp01(cursorSmallerWithDistance);
}

}
