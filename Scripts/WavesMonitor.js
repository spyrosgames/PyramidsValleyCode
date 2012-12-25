#pragma strict
private var WaveNumber : int;
private var ArmyNumber : int;

public var WaveNumberGUIText : GUIText;
public var ArmyNumberGUIText : GUIText;

private var NumberOfWaveMeleeEnemies : Hashtable;
private var NumberOfWaveRangedEnemies : Hashtable;

private var ArmyHealthAndDamage : Hashtable;

private var MeleeArmyHealth : Hashtable;
private var MeleeArmyDamage : Hashtable;

private var RangedArmyHealth : Hashtable;
private var RangedArmyDamage : Hashtable;

private var AntagonistHealth : Hashtable;
private var AntagonistDamage : Hashtable;

private var globals : Globals;
private var waveToKillEnemies : int;

public var maxNumberOfEnemiesInScene : int = 14;
private var numberOfMeleeEnemies : int;
private var numberOfRangedEnemies : int;

public var RangedEnemies : GameObject[];
public var MeleeEnemies : GameObject[];

public var MainCamera : GameObject;

public var RangedEnemyBulletGO : GameObject;
public var AntagonistBulletGO : GameObject;

private var meleeEnemyDamage : float;
private var rangedEnemyDamage : float;

public var enemyReviveEffect : GameObject;

/**
*Count Down Timer for timed wave
*/
public var timedWaveCounterCrossGO : GameObject;  //NGUI Label

private var startTime : float;
private var restSeconds : int;
private var roundedRestSeconds : int;
private var displaySeconds : int;
private var displayMinutes : int;
private var countDownSeconds : int = 60;
private var text : String;
/**
*
**/

/*
*	For Antagonist wave, instantitate the antagonist at the antagonist checkpoint, with particles on him.
*/
public var antagonistGO : GameObject;
public var antagonistCheckpoint : GameObject;


function Awake()
{
	useGUILayout = false;
	globals = Globals.GetInstance();
	
	NumberOfWaveMeleeEnemies = new Hashtable();
	NumberOfWaveRangedEnemies = new Hashtable();
	ArmyHealthAndDamage = new Hashtable();
	
	MeleeArmyHealth = new Hashtable();
	MeleeArmyDamage = new Hashtable();
	
	RangedArmyHealth = new Hashtable();
	RangedArmyDamage = new Hashtable();
	
	AntagonistHealth = new Hashtable();
	AntagonistDamage = new Hashtable();
	/*
	*	Set the timed wave ID = 1000 and the Antagonist wave ID = 2000
	*/
	
	//(WaveNumber, NumberOfMeleeEnemies);
	NumberOfWaveMeleeEnemies.Add(1, 20);//20
	NumberOfWaveMeleeEnemies.Add(2, 40);//30
	NumberOfWaveMeleeEnemies.Add(3, 58);//39
	NumberOfWaveMeleeEnemies.Add(4, 70);//45
	NumberOfWaveMeleeEnemies.Add(5, 60);//40
	NumberOfWaveMeleeEnemies.Add(6, 0);
	NumberOfWaveMeleeEnemies.Add(7, 40);//60
	NumberOfWaveMeleeEnemies.Add(8, 40);//60
	NumberOfWaveMeleeEnemies.Add(9, 54);//77
	NumberOfWaveMeleeEnemies.Add(10, 56);//58

	//Set the timedwave number to be a large number, let's say 1000
	//Set the melee enemies number to be a large one, that cannot be reached in 60 seconds
	NumberOfWaveMeleeEnemies.Add(1000, 1000);
	
	NumberOfWaveRangedEnemies.Add(1, 0);
	NumberOfWaveRangedEnemies.Add(2, 0);
	NumberOfWaveRangedEnemies.Add(3, 2);//1
	NumberOfWaveRangedEnemies.Add(4, 10);//5
	NumberOfWaveRangedEnemies.Add(5, 14);//17
	NumberOfWaveRangedEnemies.Add(6, 40);//40
	NumberOfWaveRangedEnemies.Add(7, 58);//39
	NumberOfWaveRangedEnemies.Add(8, 40);//60
	NumberOfWaveRangedEnemies.Add(9, 54);//77
	NumberOfWaveRangedEnemies.Add(10, 56);//138
	
	//Set the ranged enemies number to be a large one, that cannot be reached in 60 seconds
	NumberOfWaveRangedEnemies.Add(1000, 1000);
	

	ArmyHealthAndDamage.Add(1, 1); //Army 0, Multiply health and damage by 1
	ArmyHealthAndDamage.Add(2, 1.5);
	ArmyHealthAndDamage.Add(3, 2);
	ArmyHealthAndDamage.Add(4, 4);
	ArmyHealthAndDamage.Add(5, 8);
	
	MeleeArmyHealth.Add(1, 20);
	MeleeArmyHealth.Add(2, 80);
	MeleeArmyHealth.Add(3, 550);
	MeleeArmyHealth.Add(4, 115);
	MeleeArmyHealth.Add(5, 1600);
	
	MeleeArmyDamage.Add(1, 15);
	MeleeArmyDamage.Add(2, 20);
	MeleeArmyDamage.Add(3, 30);
	MeleeArmyDamage.Add(4, 40);
	MeleeArmyDamage.Add(5, 50);
	
	RangedArmyHealth.Add(1, 10);
	RangedArmyHealth.Add(2, 60);
	RangedArmyHealth.Add(3, 300);
	RangedArmyHealth.Add(4, 450);
	RangedArmyHealth.Add(5, 600);
	
	RangedArmyDamage.Add(1, 15);
	RangedArmyDamage.Add(2, 30);
	RangedArmyDamage.Add(3, 40);
	RangedArmyDamage.Add(4, 60);
	RangedArmyDamage.Add(5, 80);
	
	AntagonistHealth.Add(1, 1000);
	AntagonistHealth.Add(2, 1000);
	AntagonistHealth.Add(3, 1000);
	AntagonistHealth.Add(4, 1000);
	AntagonistHealth.Add(5, 1000);
	
	AntagonistDamage.Add(1, 20);
	AntagonistDamage.Add(2, 40);
	AntagonistDamage.Add(3, 60);
	AntagonistDamage.Add(4, 80);
	AntagonistDamage.Add(5, 100);
	
	ArmyNumber = PlayerPrefs.GetInt("ArmyNumber");
	WaveNumber = PlayerPrefs.GetInt("WaveNumber");
	
	if(WaveNumber != 2000) //if this is not the antagonist wave
	{
		IncreaseEnemiesDamageAndHealth(ArmyNumber);
		AnimateArmyTitle();
		AnimateWaveTitle();		
		InstantiateEnemies();
	}
	/**For timed wave only**/
	if(WaveNumber == 1000)
	{
		startTime = Time.time;
	}	
	
	if(WaveNumber == 2000)
	{
		IncreaseAntagonistDamageAndHealth(ArmyNumber);
		AnimateArmyTitle();
		AnimateWaveTitle();
		//Instantiate the antagonist
		Invoke("InstantiateAntagonist", 2);
	}			
}

function Start () {

}

function Update () {
	if(globals.enemiesKilled == waveToKillEnemies)
	{
		Debug.Log("Start");
		if(WaveNumber < 11)
		{
			WaveNumber++;
			PlayerPrefs.SetInt("WaveNumber", WaveNumber);
		}
		Debug.Log("Current wave number is = " + WaveNumber);
		if(WaveNumber < 11)
		{
			PlayerPrefs.SetInt("WaveNumber", WaveNumber);
		
			AnimateWaveTitle();
		
			InstantiateEnemies();
		}
		else if(WaveNumber == 11)
		{
			iTween.CameraFadeAdd();
			iTween.CameraFadeTo(0.35, 1.2);
			
			Invoke("LoadComicsLevel", 1.2);
		}
	}
	
	if(WaveNumber == 1000)
	{
		var guiTime : float = Time.time - startTime;

	    restSeconds = countDownSeconds - (guiTime);
	
	    //display messages or whatever here -->do stuff based on your timer
	    if (restSeconds == 60) {
	        Debug.Log("One Minute Left");
	    }
	    if (restSeconds == 0) {
	    	
	        iTween.CameraFadeAdd();
			iTween.CameraFadeTo(0.35, 1.2);
				
			Invoke("LoadWavesMenuLevel", 1.2);
			//do stuff here
	    }
	
	    //display the timer
	    roundedRestSeconds = Mathf.CeilToInt(restSeconds);
	    displaySeconds = roundedRestSeconds % 60;
	    displayMinutes = roundedRestSeconds / 60; 
	
	    text = String.Format ("{0:00}:{1:00}", displayMinutes, displaySeconds);
	    timedWaveCounterCrossGO.SendMessage("UpdateText", text);
	}
	
}

function LoadComicsLevel()
{
	PlayerPrefs.SetString("LoadLevel", "ComicsScene");
	Application.LoadLevel("Loading");				
}

function LoadWavesMenuLevel()
{
	PlayerPrefs.SetString("LoadLevel", "WavesMenu");
	Application.LoadLevel("Loading");	
}

function AnimateWaveTitle()
{
	if(PlayerPrefs.GetInt("WaveNumber") != 1000 && PlayerPrefs.GetInt("WaveNumber") != 2000)
	{
		WaveNumberGUIText.text = "Wave " + PlayerPrefs.GetInt("WaveNumber") + " Started!";
	}
	else if(PlayerPrefs.GetInt("WaveNumber") == 1000)
	{
		WaveNumberGUIText.text = "Torture them!";
	}
	else if(PlayerPrefs.GetInt("WaveNumber") == 2000)
	{
		WaveNumberGUIText.text = "The Boss!";
	}
	//WaveNumberGUITexture.texture = WaveNumberImages[PlayerPrefs.GetInt("WaveNumber")];
	iTween.ValueTo(gameObject, iTween.Hash("from", Vector2(-600, 30), "to", new Vector2(-130,30),"time",7.0,"onUpdate", "AnimateGUITextPixelOffset", "easeType", iTween.EaseType.easeOutElastic));
	iTween.ValueTo(gameObject, iTween.Hash("from", Vector2(-130, 30), "to", new Vector2(600,30),"time",7.0,"delay",4.0,"onUpdate", "AnimateGUITextPixelOffset", "easeType", iTween.EaseType.easeOutElastic));

	ZoomInCamera();
	
	if(PlayerPrefs.GetInt("WaveNumber") != 2000)
	{
		globals.enemiesKilled = 0;
		waveToKillEnemies = GetNumberOfWaveRangedEnemies(PlayerPrefs.GetInt("WaveNumber")) + GetNumberOfWaveMeleeEnemies(PlayerPrefs.GetInt("WaveNumber"));
	}
}

function AnimateArmyTitle()
{
	ArmyNumberGUIText.text = "       Army " + PlayerPrefs.GetInt("ArmyNumber");

	iTween.ValueTo(gameObject, iTween.Hash("from", Vector2(-600, 60), "to", new Vector2(-105,60),"time",7.0,"onUpdate", "AnimateArmyGUITextPixelOffset", "easeType", iTween.EaseType.easeOutElastic));
	iTween.ValueTo(gameObject, iTween.Hash("from", Vector2(-105, 60), "to", new Vector2(600,60),"time",7.0,"delay",4.0,"onUpdate", "AnimateArmyGUITextPixelOffset", "easeType", iTween.EaseType.easeOutElastic));
}

function ZoomInCamera()
{
	//Zoom the field of view in:

    iTween.ValueTo(gameObject,{"from":58,"to":38,"time":2.5,"onupdate":"animateFieldOfView","easetype":"easeinoutcubic"});

    
    //Zoom the field of view out:
    iTween.ValueTo(gameObject,{"from":38,"to":58,"time":2.5,"delay":2.4,"onupdate":"animateFieldOfView","easetype":"easeinoutcubic"});
}

function InstantiateEnemies()
{
	numberOfMeleeEnemies = GetNumberOfWaveMeleeEnemies(PlayerPrefs.GetInt("WaveNumber"));
	if(numberOfMeleeEnemies > 0)
	{
		var meleeEnemiesNumber : int;
		if(numberOfMeleeEnemies < maxNumberOfEnemiesInScene * 0.5)
		{
			meleeEnemiesNumber = numberOfMeleeEnemies;
		}
		else
		{
			meleeEnemiesNumber = maxNumberOfEnemiesInScene * 0.5;
		}
		
		for(var i : int = 0; i < meleeEnemiesNumber; i++)
		{
			yield WaitForSeconds(1);
			
			MeleeEnemies[i].GetComponent.<NewAIFollowJavaScript>().isDead = false;
			MeleeEnemies[i].GetComponent.<Health>().dead = false;
			MeleeEnemies[i].GetComponent.<Health>().onlyOnce = true;
			
			
			var meleeEnemyHealth : Health = MeleeEnemies[i].GetComponent.<Health>();
			meleeEnemyHealth.health = meleeEnemyHealth.maxHealth;
			
			/*
			//damage amount
			MeleeEnemies[i].transform.Find("MeleeAttack").GetComponent.<MeleeEnemyAttack>().damagePerSecond = meleeEnemyDamage;
			*/
			  
			//enemyReviveEffects
			var meleeEnemyReviveEffectGO : GameObject = Instantiate(enemyReviveEffect, MeleeEnemies[i].transform.position + Vector3(0, 6, 0), Quaternion.identity);
			meleeEnemyReviveEffectGO.transform.parent = MeleeEnemies[i].transform;

			MeleeEnemies[i].SetActiveRecursively(true);
			MeleeEnemies[i].GetComponent.<NavMeshAgent>().Resume();

			yield WaitForSeconds(1);
		}
	}
	
	numberOfRangedEnemies = GetNumberOfWaveRangedEnemies(PlayerPrefs.GetInt("WaveNumber"));
	if(numberOfRangedEnemies > 0)
	{
		var rangedEnemiesNumber : int;
		if(numberOfRangedEnemies < maxNumberOfEnemiesInScene * 0.5)
		{
			rangedEnemiesNumber = numberOfRangedEnemies;
		}
		else
		{
			rangedEnemiesNumber = maxNumberOfEnemiesInScene * 0.5;
		}
		for(var j : int = 0; j < rangedEnemiesNumber; j++)
		{
			yield WaitForSeconds(1);
			
			RangedEnemies[j].GetComponent.<NewAIFollowJavaScript>().isDead = false;
			RangedEnemies[j].GetComponent.<Health>().dead = false;
			RangedEnemies[j].GetComponent.<Health>().onlyOnce = true;
			
			var rangedEnemyHealth : Health = RangedEnemies[j].GetComponent.<Health>();
			rangedEnemyHealth.health = rangedEnemyHealth.maxHealth;
			 /*
			 //damage amount - it's the damage amount of the bullet the ranged enemy shoots
			 Missile.GetComponent.<SeekerBullet>().damageAmount = rangedEnemyDamage;
			*/
			 
			//enemyReviveEffects
			var rangedEnemyReviveEffectGO : GameObject = Instantiate(enemyReviveEffect, RangedEnemies[j].transform.position + Vector3(0, 6, 0), Quaternion.identity);
			rangedEnemyReviveEffectGO.transform.parent = RangedEnemies[j].transform;

			RangedEnemies[j].SetActiveRecursively(true);
			RangedEnemies[j].GetComponent.<NavMeshAgent>().Resume();

			yield WaitForSeconds(1);
		}
	}
	
}

function GetNumberOfWaveRangedEnemies(waveNumber : int) : int
{
	return NumberOfWaveRangedEnemies[waveNumber];
}

function GetNumberOfWaveMeleeEnemies(waveNumber : int) : int
{
	return NumberOfWaveMeleeEnemies[waveNumber];
}

function GetTotalNumberOfWaveEnemeis(waveNumber : int) : int
{
	return GetNumberOfWaveRangedEnemies(waveNumber) + GetNumberOfWaveMeleeEnemies(waveNumber);
}

function GetIncreaseOfHealthAndDamage(armyNumber : int) : float
{
	return ArmyHealthAndDamage[armyNumber];
}

function GetIncreaseOfMeleeHealth(armyNumber : int) : float
{
	return MeleeArmyHealth[armyNumber];
}

function GetIncreaseOfRangedHealth(armyNumber : int) : float
{
	return RangedArmyHealth[armyNumber];
}

function GetIncreaseOfMeleeDamage(armyNumber : int) : float
{
	return MeleeArmyDamage[armyNumber];
}

function GetIncreaseOfRangedDamage(armyNumber : int) : float
{
	return RangedArmyDamage[armyNumber];
}

function GetIncreaseOfAntagonistHealth(armyNumber : int) : float
{
	return AntagonistHealth[armyNumber];
}

function GetIncreaseOfAntagonistDamage(armyNumber : int) : float
{
	return AntagonistDamage[armyNumber];
}

function IncreaseEnemiesDamageAndHealth(armyNumber : int)
{
	var IncreaseOfMeleeHealth : float = GetIncreaseOfMeleeHealth(armyNumber);
	var IncreaseOfRangedHealth : float = GetIncreaseOfRangedHealth(armyNumber);
	var IncreaseOfMeleeDamage : float = GetIncreaseOfMeleeDamage(armyNumber);
	var IncreaseOfRangedDamage : float = GetIncreaseOfRangedDamage(armyNumber);
	
	//Melee
	//Increase maxhealth
	globals.meleeEnemyMaxHealth = IncreaseOfMeleeHealth; 
	
	
	//Increase damage
	globals.meleeEnemyDamage =  IncreaseOfMeleeDamage;
	
	//Ranged
	//Increase maxhealth
	globals.rangedEnemyMaxHealth = IncreaseOfRangedHealth;
	
	//Increase damage
	globals.rangedEnemyDamage =  IncreaseOfRangedDamage;
		
	for(var i : int = 0; i < MeleeEnemies.length; i++)
	{
		var meleeEnemyHealth = MeleeEnemies[i].GetComponent.<Health>();
		var meleeEnemyDamage = MeleeEnemies[i].transform.Find("MeleeAttack").GetComponent.<MeleeEnemyAttack>();
		//meleeEnemyHealth.maxHealth = InitialMeleeEnemyHealth * IncreaeOfHealthAndDamage;
		meleeEnemyHealth.maxHealth = globals.meleeEnemyMaxHealth;
		meleeEnemyHealth.health = meleeEnemyHealth.maxHealth;
		//PlayerPrefs.SetFloat("meleeEnemyMaxHealth", globals.meleeEnemyMaxHealth);
		

		meleeEnemyDamage.damagePerSecond = globals.meleeEnemyDamage;
		//PlayerPrefs.SetFloat("meleeEnemyDamage", globals.meleeEnemyDamage);
		
		//meleeEnemyDamage.damagePerSecond = InitialMeleeEnemeyDamage * IncreaeOfHealthAndDamage;
	}

	for(var j : int = 0; j < RangedEnemies.length; j++)
	{
		var rangedEnemyHealth = RangedEnemies[j].GetComponent.<Health>();
		var rangedEnemyDamage = RangedEnemyBulletGO.GetComponent.<RangedEnemyBullet>();
		//rangedEnemyHealth.maxHealth = InitialRangedEnemyHealth * IncreaeOfHealthAndDamage;
		rangedEnemyHealth.maxHealth = globals.rangedEnemyMaxHealth;
		rangedEnemyHealth.health = rangedEnemyHealth.maxHealth;
		//PlayerPrefs.SetFloat("rangedEnemyMaxHealth", globals.rangedEnemyMaxHealth);
		 
		rangedEnemyDamage.damageAmount = globals.rangedEnemyDamage;
		//PlayerPrefs.SetFloat("rangedEnemyDamage", globals.rangedEnemyDamage);
		
		//rangedEnemyDamage.damageAmount = InitialRangedEnemyDamage * IncreaeOfHealthAndDamage;
	}
}

function IncreaseAntagonistDamageAndHealth(armyNumber : int)
{
	var IncreaeOfAntagonistHealth : float = GetIncreaseOfAntagonistHealth(armyNumber);
	var IncreaseOfAntagonistDamage : float = GetIncreaseOfAntagonistDamage(armyNumber);
	
	//Increase health amount of the antagonist
	globals.antagonistMaxHealth = IncreaeOfAntagonistHealth;
	
	//Increase damage amount of the antagonist
	globals.antagonistDamage =  IncreaseOfAntagonistDamage;
	
	var antagonistHealth : Health = antagonistGO.GetComponent.<Health>();
	var antagonistDamage = AntagonistBulletGO.GetComponent.<AntagonistBullet>();
	
	antagonistHealth.maxHealth = globals.antagonistMaxHealth;
	antagonistHealth.health = antagonistHealth.maxHealth;
	
	antagonistDamage.damageAmount = globals.antagonistDamage;
}

function AnimateGUITextPixelOffset(pixelOffset : Vector2){

    WaveNumberGUIText.pixelOffset = pixelOffset;
    //WaveNumberGUITexture.pixelInset = pixelInset;
}

function AnimateArmyGUITextPixelOffset(pixelOffset : Vector2)
{
	ArmyNumberGUIText.pixelOffset = pixelOffset;
}

function animateFieldOfView(newFieldOfView : float){

    MainCamera.camera.main.fieldOfView = newFieldOfView;
}

function InstantiateAntagonist()
{
	antagonistGO.SetActiveRecursively(true);
	antagonistGO.transform.position = Vector3(antagonistCheckpoint.transform.position.x, antagonistCheckpoint.transform.position.y, antagonistCheckpoint.transform.position.z);
	antagonistGO.transform.rotation = antagonistCheckpoint.transform.rotation;
	//antagonistInstantiationParticles.SetActiveRecursively(true);
	//antagonistInstantiationParticles.transform.position = antagonistGO.transform.position;
}

function OnAntagonistDeath()
{
	Debug.Log("Antagonist is dead.");
	iTween.CameraFadeAdd();
	iTween.CameraFadeTo(0.35, 1.5);
		
	Invoke("LoadComicsLevel", 1.5);	
}