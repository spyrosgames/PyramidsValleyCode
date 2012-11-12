#pragma strict
private var WaveNumber : int;
private var ArmyNumber : int;
private var startTime : float;
private var guiTime : float;
private var restSeconds : int;
private var countDownSeconds : int;
private var roundedRestSeconds : int;

public var WaveNumberGUIText : GUIText;
public var WaveNumberGUITexture : GUITexture;
public var ArmyNumberGUIText : GUIText;

private var NumberOfWaveMeleeEnemies : Hashtable;
private var NumberOfWaveRangedEnemies : Hashtable;

private var ArmyHealthAndDamage : Hashtable;

private var globals : Globals;
private var waveToKillEnemies : int;

public var maxNumberOfEnemiesInScene : int = 14;
private var numberOfMeleeEnemies : int;
private var numberOfRangedEnemies : int;

public var RangedEnemies : GameObject[];
public var MeleeEnemies : GameObject[];

public var MainCamera : GameObject;

public var Missile : GameObject;


/*IMPORTANT*/
/*Those values should be the same is the values put for enemies in the editor inspector*/
private var InitialRangedEnemyHealth : float = 10;
private var InitialMeleeEnemyHealth : float = 10;
private var InitialRangedEnemyDamage : float = 5;
private var InitialMeleeEnemeyDamage : float = 5;

private var meleeEnemyDamage : float;
private var rangedEnemyDamage : float;

public var enemyReviveEffect : GameObject;

function Awake()
{
	useGUILayout = false;
	globals = Globals.GetInstance();
	
	rangedEnemyDamage = globals.rangedEnemyDamage;
	
	if(rangedEnemyDamage == 0)
	{
		 rangedEnemyDamage = 5; //Damage amount of the seeker bullet
		 PlayerPrefs.SetFloat("rangedEnemyDamage", 5);
	}
	
	NumberOfWaveMeleeEnemies = new Hashtable();
	NumberOfWaveRangedEnemies = new Hashtable();
	ArmyHealthAndDamage = new Hashtable();

	//(WaveNumber, NumberOfMeleeEnemies);
	NumberOfWaveMeleeEnemies.Add(0, 20);//20
	NumberOfWaveMeleeEnemies.Add(1, 40);//30
	NumberOfWaveMeleeEnemies.Add(2, 58);//39
	NumberOfWaveMeleeEnemies.Add(3, 70);//45
	NumberOfWaveMeleeEnemies.Add(4, 60);//40
	NumberOfWaveMeleeEnemies.Add(5, 0);
	NumberOfWaveMeleeEnemies.Add(6, 40);//60
	NumberOfWaveMeleeEnemies.Add(7, 40);//60
	NumberOfWaveMeleeEnemies.Add(8, 54);//77
	NumberOfWaveMeleeEnemies.Add(9, 56);//58


	NumberOfWaveRangedEnemies.Add(0, 0);
	NumberOfWaveRangedEnemies.Add(1, 0);
	NumberOfWaveRangedEnemies.Add(2, 2);//1
	NumberOfWaveRangedEnemies.Add(3, 10);//5
	NumberOfWaveRangedEnemies.Add(4, 14);//17
	NumberOfWaveRangedEnemies.Add(5, 40);//40
	NumberOfWaveRangedEnemies.Add(6, 58);//39
	NumberOfWaveRangedEnemies.Add(7, 40);//60
	NumberOfWaveRangedEnemies.Add(8, 54);//77
	NumberOfWaveRangedEnemies.Add(9, 56);//138

	ArmyHealthAndDamage.Add(0, 1); //Army 0, Multiply health and damage by 1
	ArmyHealthAndDamage.Add(1, 1.5);
	ArmyHealthAndDamage.Add(2, 2);
	ArmyHealthAndDamage.Add(3, 4);
	ArmyHealthAndDamage.Add(4, 8);
	/*
	if(PlayerPrefs.GetInt("WaveNumber") == 0)
	{
		WaveNumber = PlayerPrefs.GetInt("WaveNumber") + 1;
	}
	
	else if(PlayerPrefs.GetInt("WaveNumber") != 0) //to be considered
	{
		WaveNumber = PlayerPrefs.GetInt("WaveNumber");
	}
	*/
}

function Start () {

}

function Update () {
	if(globals.enemiesKilled == waveToKillEnemies && waveToKillEnemies > 0)
	{
		ArmyNumber = PlayerPrefs.GetInt("ArmyNumber");
		if(ArmyNumber < 5)
		{
			WaveNumber = PlayerPrefs.GetInt("WaveNumber");
			WaveNumber++;
			if(WaveNumber == 10)
			{
				WaveNumber = 0;
				ArmyNumber++;
				PlayerPrefs.SetInt("ArmyNumber", ArmyNumber);
				IncreaseEnemiesDamageAndHealth(ArmyNumber);
				AnimateArmyTitle();
			}

			PlayerPrefs.SetInt("WaveNumber", WaveNumber);
			
			AnimateWaveTitle();
			
			InstantiateEnemies();
		}
	}
}

function AnimateWaveTitle()
{
	WaveNumberGUIText.text = "Wave " + PlayerPrefs.GetInt("WaveNumber") + " Started!";
	//WaveNumberGUITexture.texture = WaveNumberImages[PlayerPrefs.GetInt("WaveNumber")];
	iTween.ValueTo(gameObject, iTween.Hash("from", Vector2(-600, 30), "to", new Vector2(-130,30),"time",7.0,"onUpdate", "AnimateGUITextPixelOffset", "easeType", iTween.EaseType.easeOutElastic));
	iTween.ValueTo(gameObject, iTween.Hash("from", Vector2(-130, 30), "to", new Vector2(600,30),"time",7.0,"delay",4.0,"onUpdate", "AnimateGUITextPixelOffset", "easeType", iTween.EaseType.easeOutElastic));

	ZoomInCamera();

	globals.enemiesKilled = 0;
	waveToKillEnemies = GetNumberOfWaveRangedEnemies(PlayerPrefs.GetInt("WaveNumber")) + GetNumberOfWaveMeleeEnemies(PlayerPrefs.GetInt("WaveNumber"));
}

function AnimateArmyTitle()
{
	if(PlayerPrefs.GetInt("ArmyNumber") > 0)
	{
		ArmyNumberGUIText.text = "       Army " + PlayerPrefs.GetInt("ArmyNumber");
	}

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
			
			/*
			var meleeEnemyHealth : Health = MeleeEnemies[i].GetComponent.<Health>();
			meleeEnemyHealth.health = meleeEnemyHealth.maxHealth;
			 
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
			/*
			var rangedEnemyHealth : Health = RangedEnemies[j].GetComponent.<Health>();
			rangedEnemyHealth.health = rangedEnemyHealth.maxHealth;
			 
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

function IncreaseEnemiesDamageAndHealth(armyNumber : int)
{
	var IncreaeOfHealthAndDamage : float = GetIncreaseOfHealthAndDamage(armyNumber);

	for(var i : int = 0; i < MeleeEnemies.length; i++)
	{
		var meleeEnemyHealth = MeleeEnemies[i].GetComponent.<Health>();
		var meleeEnemyDamage = MeleeEnemies[i].transform.Find("MeleeAttack").GetComponent.<MeleeEnemyAttack>();
		//meleeEnemyHealth.maxHealth = InitialMeleeEnemyHealth * IncreaeOfHealthAndDamage;
		
		//Increase maxhealth
		globals.meleeEnemyMaxHealth *= IncreaeOfHealthAndDamage; 
		meleeEnemyHealth.maxHealth = globals.meleeEnemyMaxHealth;
		meleeEnemyHealth.health = meleeEnemyHealth.maxHealth;
		PlayerPrefs.SetFloat("meleeEnemyMaxHealth", globals.meleeEnemyMaxHealth);
		
		//Increase damage
		globals.meleeEnemyDamage *=  IncreaeOfHealthAndDamage;
		meleeEnemyDamage.damagePerSecond = globals.meleeEnemyDamage;
		PlayerPrefs.SetFloat("meleeEnemyDamage", globals.meleeEnemyDamage);
		
		//meleeEnemyDamage.damagePerSecond = InitialMeleeEnemeyDamage * IncreaeOfHealthAndDamage;
	}

	for(var j : int = 0; j < RangedEnemies.length; j++)
	{
		var rangedEnemyHealth = RangedEnemies[j].GetComponent.<Health>();
		var rangedEnemyDamage = Missile.GetComponent.<SeekerBullet>();
		//rangedEnemyHealth.maxHealth = InitialRangedEnemyHealth * IncreaeOfHealthAndDamage;
		
		//Increase maxhealth
		globals.rangedEnemyMaxHealth *= IncreaeOfHealthAndDamage;
		rangedEnemyHealth.maxHealth = globals.rangedEnemyMaxHealth;
		rangedEnemyHealth.health = rangedEnemyHealth.maxHealth;
		PlayerPrefs.SetFloat("rangedEnemyMaxHealth", globals.rangedEnemyMaxHealth);
		 
		//Increase damage
		globals.rangedEnemyDamage *=  IncreaeOfHealthAndDamage;
		rangedEnemyDamage.damageAmount = globals.rangedEnemyDamage;
		PlayerPrefs.SetFloat("rangedEnemyDamage", globals.rangedEnemyDamage);
		
		//rangedEnemyDamage.damageAmount = InitialRangedEnemyDamage * IncreaeOfHealthAndDamage;
	}
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