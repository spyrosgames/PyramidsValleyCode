#pragma strict
public var AnimationCamera : GameObject;
public var MainCamera : GameObject;
public var Player : GameObject;
public var EnemiesWaves : GameObject;
public var enemiesKilledGUIGameObject : GameObject;
public var LivesHearts : GameObject;
public var MenuSoundTrackAudioSource : GameObject;
public var MainSoundTrackAudioSource : GameObject;
public var scaredGround : GameObject;
public var GesturesRecognizer : GameObject;
public var GesturesCamera : GameObject;

public var JoystickLeftTexture : GameObject;
public var JoystickRightTexture : GameObject;

public var HUDs : GameObject;

private var magicsManaTable : MagicsManaTable;
private var globals : Globals;
//public var tempEnemy : GameObject;
//public var magicMeter : GameObject;

function Awake()
{
	PlayerPrefs.DeleteAll();
	globals = Globals.GetInstance();
	//guiTexture.pixelInset = Rect(Screen.width * 0.5 - 128, Screen.height * 0.5 - 64, 256, 128);
}

function Start () {
	/*
	MainCamera.SetActiveRecursively(false);
	Player.SetActiveRecursively(false);
	enemiesKilledGUIGameObject.SetActiveRecursively(false);
	EnemiesWaves.active = false;
	*/
}

function Update () {
	if (Input.touchCount > 0)
	{
		for(var i : int = 0; i < Input.touchCount;i++)
		{
			var touch : Touch = Input.GetTouch(i);
			// Check whether we are getting a touch and that it is within the bounds of
			// the title graphic
			if(touch.phase == TouchPhase.Began && guiTexture.HitTest(touch.position))
			{
				
				//TODO: Refactor
				PlayerPrefs.SetString("Magic0", "HolyFire");
        		PlayerPrefs.SetString("Magic1", "Crowstorm");
        		PlayerPrefs.SetString("Magic2", "Tornado");
       			PlayerPrefs.SetString("Magic3", "Starfall");
        		PlayerPrefs.SetString("Magic4", "LightningStrike");
        		PlayerPrefs.SetString("Magic5", "Shake");
        		
        		GesturesRecognizer.active = true;
        		magicsManaTable = GesturesRecognizer.GetComponent.<MagicsManaTable>();
        		magicsManaTable.AddMagicManaAmount("HolyFire", 10);
        		magicsManaTable.AddMagicManaAmount("Crowstorm", 20);
        		magicsManaTable.AddMagicManaAmount("Tornado", 30);
				magicsManaTable.AddMagicManaAmount("Starfall", 40);
				magicsManaTable.AddMagicManaAmount("LightningStrike", 50);
				magicsManaTable.AddMagicManaAmount("Shake", 50);
				
				PlayerPrefs.SetInt("healthPotionsNumber", 3);
				globals.healthPotionsNumber = 3;
				
				PlayerPrefs.SetInt("manaPotionsNumber", 3);
				globals.manaPotionsNumber = 3;
				
				//
				
				guiTexture.enabled = false;
				AnimationCamera.active = false;
				MainCamera.SetActiveRecursively(true);

				MenuSoundTrackAudioSource.active = false;
				MainSoundTrackAudioSource.active = true;
				Player.SetActiveRecursively(true);
				if(Player.rigidbody.isKinematic == true)
				{
					Player.rigidbody.isKinematic = false;
				}
				var scaredGround = Instantiate(scaredGround, Player.transform.position, Quaternion.identity);
				scaredGround.transform.parent = Player.transform;

				//LivesHearts.SetActiveRecursively(true);

				//JoystickRightTexture.active = true;
				//JoystickLeftTexture.active = true;
				
				HUDs.SetActiveRecursively(true);
				EnemiesWaves.active = true;

				
				GesturesCamera.active = true; //A independent camera for rendering gestures

				this.gameObject.active = false;
			}			
		}
	}
}