#pragma strict
public var Player : GameObject;
public var EnemiesWaves : GameObject;
public var MainSoundTrackAudioSource : GameObject;
public var scaredGround : GameObject;
public var GesturesRecognizer : GameObject;
public var GesturesCamera : GameObject;

public var JoystickLeftTexture : GameObject;
public var JoystickRightTexture : GameObject;

public var HUDs : GameObject;

private var magicsManaTable : MagicsManaTable;
private var globals : Globals;

function Awake()
{
	globals = Globals.GetInstance();
	
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
	
	//MenuSoundTrackAudioSource.active = false;
	
	MainSoundTrackAudioSource.active = true;
	
	Player.SetActiveRecursively(true);
	if(Player.rigidbody.isKinematic == true)
	{
		Player.rigidbody.isKinematic = false;
	}
	var scaredGround = Instantiate(scaredGround, Player.transform.position, Quaternion.identity);
	scaredGround.transform.parent = Player.transform;

	//JoystickRightTexture.active = true;
	//JoystickLeftTexture.active = true;
	
	HUDs.SetActiveRecursively(true);
	EnemiesWaves.active = true;

	GesturesCamera.active = true; //A independent camera for rendering gestures

	//this.gameObject.active = false;
}	