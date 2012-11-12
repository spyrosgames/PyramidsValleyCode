#pragma strict

@script RequireComponent (Rigidbody)

class FreeMovementMotor extends MovementMotor {
	
	//public var movement : MoveController;
	public var walkingSpeed : float;
	public var walkingSnappyness : float = 50;
	public var turningSmoothing : float = 0.3;
	private var globals : Globals;
	
	function Awake()
	{
		globals = Globals.GetInstance();
		walkingSpeed = globals.playerWalkingSpeed;
		if(walkingSpeed == 0)
		{
			walkingSpeed = 14;
			globals.playerWalkingSpeed = 14;
			PlayerPrefs.SetFloat("playerWalkingSpeed", walkingSpeed);
		}
	}
	
	function FixedUpdate () {
		// Handle the movement of the character
		var targetVelocity : Vector3 = movementDirection * walkingSpeed;
		var deltaVelocity : Vector3 = targetVelocity - rigidbody.velocity;
		if (rigidbody.useGravity)
			deltaVelocity.y = 0;
		rigidbody.AddForce (deltaVelocity * walkingSnappyness, ForceMode.Acceleration);
		
		// Setup player to face facingDirection, or if that is zero, then the movementDirection
		var faceDir : Vector3 = facingDirection;
		if (faceDir == Vector3.zero)
			faceDir = movementDirection;
		
		// Make the character rotate towards the target rotation
		if (faceDir == Vector3.zero) {
			rigidbody.angularVelocity = Vector3.zero;
		}
		else {
			var rotationAngle : float = AngleAroundAxis (transform.forward, faceDir, Vector3.up);
			//rigidbody.angularVelocity = (Vector3.up * rotationAngle * turningSmoothing);
			transform.Rotate(0, rotationAngle * 30 * Time.deltaTime, 0);
		}
	}
	
	// The angle between dirA and dirB around axis
	static function AngleAroundAxis (dirA : Vector3, dirB : Vector3, axis : Vector3) {
	    // Project A and B onto the plane orthogonal target axis
	    dirA = dirA - Vector3.Project (dirA, axis);
	    dirB = dirB - Vector3.Project (dirB, axis);
	   
	    // Find (positive) angle between A and B
	    var angle : float = Vector3.Angle (dirA, dirB);
	   
	    // Return angle multiplied with 1 or -1
	    return angle * (Vector3.Dot (axis, Vector3.Cross (dirA, dirB)) < 0 ? -1 : 1);
	}
	
}
