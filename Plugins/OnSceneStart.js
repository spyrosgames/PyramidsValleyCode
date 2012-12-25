#pragma strict
public var Player : GameObject;
public var EnemiesWaves : GameObject;
public var MainSoundTrackAudioSource : GameObject;
private var sacredGroundGO : GameObject;
public var GesturesRecognizer : GameObject;
public var GesturesCamera : GameObject;

public var HUDs : GameObject;

public var NGUIJoysticks : GameObject;

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
	PlayerPrefs.SetString("Magic6", "Slave");
	PlayerPrefs.SetString("Magic7", "Whirl");
	PlayerPrefs.SetString("Magic8", "DustStorm");
	PlayerPrefs.SetString("Magic9", "FingerStun");
	PlayerPrefs.SetString("Magic10", "Stun");
	PlayerPrefs.SetString("Magic11", "Fire");
	PlayerPrefs.SetString("Magic12", "StaticCharge");
	PlayerPrefs.SetString("Magic13", "Magma");
	PlayerPrefs.SetString("Magic14", "IceFall");
	PlayerPrefs.SetString("Magic15", "IceStun");
	PlayerPrefs.SetString("Magic16", "LightningBall");
	PlayerPrefs.SetString("Magic17", "LightningBolt");
	PlayerPrefs.SetString("Magic18", "Berserk");
	
	GesturesRecognizer.active = true;
	
	magicsManaTable = GesturesRecognizer.GetComponent.<MagicsManaTable>();
	magicsManaTable.AddMagicManaAmount("HolyFire", 10);
	magicsManaTable.AddMagicManaAmount("Crowstorm", 20);
	magicsManaTable.AddMagicManaAmount("Tornado", 30);
	magicsManaTable.AddMagicManaAmount("Starfall", 40);
	magicsManaTable.AddMagicManaAmount("LightningStrike", 50);
	magicsManaTable.AddMagicManaAmount("Shake", 60);
	magicsManaTable.AddMagicManaAmount("Slave", 80);
	magicsManaTable.AddMagicManaAmount("Whirl", 30);
	magicsManaTable.AddMagicManaAmount("DustStorm", 20);
	magicsManaTable.AddMagicManaAmount("FingerStun", 30);
	magicsManaTable.AddMagicManaAmount("Stun", 20);
	magicsManaTable.AddMagicManaAmount("Fire", 25);
	magicsManaTable.AddMagicManaAmount("StaticCharge", 30);
	magicsManaTable.AddMagicManaAmount("Magma", 50);
	magicsManaTable.AddMagicManaAmount("IceFall", 50);
	magicsManaTable.AddMagicManaAmount("IceStun", 30);
	magicsManaTable.AddMagicManaAmount("LightningBall", 10);
	magicsManaTable.AddMagicManaAmount("LightningBolt", 40);
	magicsManaTable.AddMagicManaAmount("Berserk", 20);
	
	PlayerPrefs.SetInt("healthPotionsNumber", 1);
	globals.healthPotionsNumber = 90;
	
	PlayerPrefs.SetInt("manaPotionsNumber", 1);
	globals.manaPotionsNumber = 90;
	
	PlayerPrefs.SetInt("revivePotionsNumber", 1);
	globals.revivePotionsNumber = 1;
	
	//MenuSoundTrackAudioSource.active = false;
	
	MainSoundTrackAudioSource.active = true;
	
	Player.SetActiveRecursively(true);
	if(Player.rigidbody.isKinematic == true)
	{
		Player.rigidbody.isKinematic = false;
	}
	
	sacredGroundGO = Resources.Load("sacredGroundModified");
	
	var sacredGround = Instantiate(sacredGroundGO, Player.transform.position, Quaternion.identity);
	sacredGround.transform.parent = Player.transform;

	
	HUDs.SetActiveRecursively(true);
	
	NGUIJoysticks.SetActiveRecursively(true);
	
	EnemiesWaves.active = true;

	GesturesCamera.active = true; //A independent camera for rendering gestures

	//this.gameObject.active = false;
}	