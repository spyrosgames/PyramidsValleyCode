#pragma strict

var objectToSpawn : GameObject;
var OneXPLabelToSpawn : GameObject;
var TwoXPLabelToSpawn : GameObject;
var ThreeXPLabelToSpawn : GameObject;
var FourXPLabelToSpawn : GameObject;
var FiveXPLabelToSpawn : GameObject;
var EightXPLabelToSpawn : GameObject;
var _50XPLabelToSpawn : GameObject;
var _100XPLabelToSpawn : GameObject;
var _150XPLabelToSpawn : GameObject;
var _200XPLabelToSpawn : GameObject;
var _250XPLabelToSpawn : GameObject;

var onDestroyedSignals : SignalSender;
var explosionSound : AudioClip;
private var spawned : GameObject;
private var XPLabel : GameObject;
private var globals : Globals;
private var enemyHealthScript : EnemyHealth;
private var screenPosition : Vector3;

private var enemyCheckPoint1 : Transform;
private var enemyCheckPoint2 : Transform;
private var enemyCheckPoint3 : Transform;
private var enemyCheckPoint4 : Transform;
private var enemyCheckPoint5 : Transform;
private var enemyCheckPoint6 : Transform;
private var enemyCheckPoint7 : Transform;
private var enemyCheckPoint8 : Transform;
private var enemyCheckPoint9 : Transform;
private var enemyCheckPoint10 : Transform;
private var enemyCheckPoint11 : Transform;
private var enemyCheckPoint12 : Transform;
private var enemyCheckPoint13 : Transform;
private var enemyCheckPoint14 : Transform;
private var enemyCheckPoint15 : Transform;
private var enemyCheckPoint16 : Transform;
private var enemyCheckPoint17 : Transform;
private var enemyCheckPoint18 : Transform;
private var enemyCheckPoint19 : Transform;

private var enemyCheckPointArray : Transform[];

private var wavesMonitor : GameObject;
private var wavesMonitorObj : WavesMonitor;

private var player : GameObject;

public var iamAtCheckPointName : String;

public var enemyReviveEffect : GameObject;

// Keep disabled from the beginning
enabled = false;

function Awake()
{
	
	globals = Globals.GetInstance();
	player = GameObject.FindWithTag ("Player");
	enemyCheckPoint1 = GameObject.FindWithTag("EnemyCheckpoint1").transform;
	enemyCheckPoint2 = GameObject.FindWithTag("EnemyCheckpoint2").transform;
	enemyCheckPoint3 = GameObject.FindWithTag("EnemyCheckpoint3").transform;
	enemyCheckPoint4 = GameObject.FindWithTag("EnemyCheckpoint4").transform;
	enemyCheckPoint5 = GameObject.FindWithTag("EnemyCheckpoint5").transform;
	enemyCheckPoint6 = GameObject.FindWithTag("EnemyCheckpoint6").transform;
	enemyCheckPoint7 = GameObject.FindWithTag("EnemyCheckpoint7").transform;
	enemyCheckPoint8 = GameObject.FindWithTag("EnemyCheckpoint8").transform;
	enemyCheckPoint9 = GameObject.FindWithTag("EnemyCheckpoint9").transform;
	enemyCheckPoint10 = GameObject.FindWithTag("EnemyCheckpoint10").transform;
	enemyCheckPoint11 = GameObject.FindWithTag("EnemyCheckpoint11").transform;
	enemyCheckPoint12 = GameObject.FindWithTag("EnemyCheckpoint12").transform;
	enemyCheckPoint13 = GameObject.FindWithTag("EnemyCheckpoint13").transform;
	enemyCheckPoint14 = GameObject.FindWithTag("EnemyCheckpoint14").transform;
	enemyCheckPoint15 = GameObject.FindWithTag("EnemyCheckpoint15").transform;
	enemyCheckPoint16 = GameObject.FindWithTag("EnemyCheckpoint16").transform;
	enemyCheckPoint17 = GameObject.FindWithTag("EnemyCheckpoint17").transform;
	enemyCheckPoint18 = GameObject.FindWithTag("EnemyCheckpoint18").transform;
	enemyCheckPoint19 = GameObject.FindWithTag("EnemyCheckpoint19").transform;


	//enemyCheckPointArray = [enemyCheckPoint1, enemyCheckPoint2, enemyCheckPoint3, enemyCheckPoint4, enemyCheckPoint5];
}
// When we get a signal, spawn the objectToSpawn and store the spawned object.
// Also enable this behaviour so the Update function will be run.
function OnDamageSignal () {
	/*
	if (audio && explosionSound) {
		audio.clip = explosionSound;
		audio.Play ();
	}
	*/

	screenPosition = Camera.main.WorldToScreenPoint(transform.parent.position);
    screenPosition.y = Screen.height - screenPosition.y;

	AudioSource.PlayClipAtPoint(explosionSound, transform.position);
	spawned = Spawner.Spawn(objectToSpawn, transform.position, Quaternion.Euler(0, -180, 0)); //The blood effect when the enemy dies
	
    if(this.transform.parent.gameObject.name == "RangedEnemy" || this.transform.parent.gameObject.name == "MeleeEnemy")
    {
		XPLabel = Spawner.Spawn(OneXPLabelToSpawn, Vector3(screenPosition.x / 480, screenPosition.y / 320, 0), transform.rotation);
		globals.XPPoints += 1;
		PlayerPrefs.SetFloat("XP", globals.XPPoints);
	}
	else if(this.transform.parent.gameObject.name == "MediumRangedEnemy" || this.transform.parent.gameObject.name == "MediumMeleeEnemy")
	{
		XPLabel = Spawner.Spawn(FourXPLabelToSpawn, Vector3(screenPosition.x / 480, screenPosition.y / 320, 0), transform.rotation);
		globals.XPPoints += 4;
		PlayerPrefs.SetFloat("XP", globals.XPPoints);
	}
	else if(this.transform.parent.gameObject.name == "BigRangedEnemy" || this.transform.parent.gameObject.name == "BigMeleeEnemy")
	{
		XPLabel = Spawner.Spawn(EightXPLabelToSpawn, Vector3(screenPosition.x / 480, screenPosition.y / 320, 0), transform.rotation);
		globals.XPPoints += 8;
		PlayerPrefs.SetFloat("XP", globals.XPPoints);
	}
	else if(this.transform.parent.gameObject.name == "Antagonist")
	{
		XPLabel = Spawner.Spawn(EightXPLabelToSpawn, Vector3(screenPosition.x / 480, screenPosition.y / 320, 0), transform.rotation);
		globals.XPPoints += 8;
		PlayerPrefs.SetFloat("XP", globals.XPPoints);	
	}
	
	if (onDestroyedSignals.receivers.Length > 0)
	{
		enabled = true;
	}
	
	if(this.transform.parent.gameObject.name == "RangedEnemy" || this.transform.parent.gameObject.name == "MeleeEnemy")
	{
		yield WaitForSeconds(0.9583335); //Length of the die animation

		var enemyCheckPointArray : Transform[] = CheckPlayerPosition();
		var resetCheckPoint : Transform = enemyCheckPointArray[Random.Range(0, 9)];
		/*
		var resetCheckPoint : Transform;

		
		
		var dist1 : float = Vector3.Distance(player.transform.position, enemyCheckPointArray[0].position);
		var dist2 : float = Vector3.Distance(player.transform.position, enemyCheckPointArray[1].position);
		var dist3 : float = Vector3.Distance(player.transform.position, enemyCheckPointArray[2].position);

		var resultDist : float = Mathf.Min(dist1, dist2, dist3);

		if(resultDist == dist1)
		{
			resetCheckPoint = enemyCheckPointArray[0];
		}
		else if(resultDist == dist2)
		{
			resetCheckPoint = enemyCheckPointArray[1];
		}
		else if(resultDist == dist3)
		{
			resetCheckPoint = enemyCheckPointArray[2];
		}
		*/
		Debug.Log("Hi I'm an enemy, I'm going now to point " + resetCheckPoint.name);
		this.transform.parent.gameObject.transform.position = resetCheckPoint.position; //move the enemies back to one of the checkpoints
		globals.enemiesKilled++;
		iamAtCheckPointName = resetCheckPoint.tag;


		wavesMonitor = GameObject.FindWithTag("WavesMonitor");
		wavesMonitorObj = wavesMonitor.GetComponent.<WavesMonitor>();

		var enemiesNumberToConsider : int;
		var remainingEnemiesToKill : int;
		var enemiesLimit : int;
		var enemiesRangedLimit : int;
		var enemiesMeleeLimit : int;
 
		if(wavesMonitorObj.GetTotalNumberOfWaveEnemeis(PlayerPrefs.GetInt("WaveNumber")) != 0)
		{
			enemiesNumberToConsider = wavesMonitorObj.GetTotalNumberOfWaveEnemeis(PlayerPrefs.GetInt("WaveNumber"));
		}
		/*
		else
		{
			enemiesNumberToConsider = wavesMonitorObj.GetNumberOfWaveRangedEnemies(PlayerPrefs.GetInt("WaveNumber"));
		}
		*/
		Debug.Log("Wave : " + PlayerPrefs.GetInt("WaveNumber") + " remaining Enemies To Kill : " + (enemiesNumberToConsider - globals.enemiesKilled) + " Total Number:" + enemiesNumberToConsider);

		if(wavesMonitorObj.GetNumberOfWaveRangedEnemies(PlayerPrefs.GetInt("WaveNumber")) >= wavesMonitorObj.maxNumberOfEnemiesInScene * 0.5)
		{
			enemiesRangedLimit = wavesMonitorObj.maxNumberOfEnemiesInScene * 0.5;
		}
		else
		{
			enemiesRangedLimit = wavesMonitorObj.GetNumberOfWaveRangedEnemies(PlayerPrefs.GetInt("WaveNumber"));
		}

		if(wavesMonitorObj.GetNumberOfWaveMeleeEnemies(PlayerPrefs.GetInt("WaveNumber")) >= wavesMonitorObj.maxNumberOfEnemiesInScene * 0.5)
		{
			enemiesMeleeLimit = wavesMonitorObj.maxNumberOfEnemiesInScene * 0.5;
		}
		else
		{
			enemiesMeleeLimit = wavesMonitorObj.GetNumberOfWaveMeleeEnemies(PlayerPrefs.GetInt("WaveNumber"));
		}

		enemiesLimit = enemiesRangedLimit + enemiesMeleeLimit;
		//Debug.Log("Wave : " + PlayerPrefs.GetInt("WaveNumber") + "enemiesLimit = " + enemiesLimit);
		/*
		if(enemiesLimit > 7)
		{
			enemiesLimit = 7;
		}
		*/
		
		remainingEnemiesToKill = enemiesNumberToConsider - globals.enemiesKilled;
		
		Destroy(spawned);
		//this.transform.parent.gameObject.SetActiveRecursively(false);

		if(remainingEnemiesToKill < enemiesLimit)
		{
			this.transform.parent.gameObject.SetActiveRecursively(false);
		}
		else
		{
			yield WaitForSeconds(1);
			var enemyReviveEffectGO : GameObject = Instantiate(enemyReviveEffect, transform.parent.gameObject.transform.position + Vector3(0, 6, 0), Quaternion.identity);
			enemyReviveEffectGO.transform.parent = transform.parent.gameObject.transform;

			//this.transform.parent.gameObject.SetActiveRecursively(true);
			
			this.transform.parent.gameObject.GetComponent.<NewAIFollowJavaScript>().isDead = false;
			this.transform.parent.gameObject.GetComponent.<Health>().dead = false;
			this.transform.parent.gameObject.GetComponent.<Health>().onlyOnce = true;
			var enemyMaxHealth2 = this.transform.parent.gameObject.GetComponent.<Health>().maxHealth;
			this.transform.parent.gameObject.GetComponent.<Health>().health = enemyMaxHealth2;
			
			yield WaitForSeconds(Random.Range(0.5, 1));
			
			this.transform.parent.gameObject.GetComponent.<NavMeshAgent>().Resume();
			
		}
		/*
		this.transform.parent.gameObject.GetComponent.<NewAIFollowJavaScript>().isDead = false;
		this.transform.parent.gameObject.GetComponent.<Health>().dead = false;
		var enemyMaxHealth = this.transform.parent.gameObject.GetComponent.<Health>().maxHealth;
		this.transform.parent.gameObject.GetComponent.<Health>().health = enemyMaxHealth;
		*/
		//
		//yield WaitForSeconds(3);

		

		//Don't Destroy small enemies, just move them to the origin.
		//yield WaitForSeconds(2);//Wait to seconds before destroying the death particles
		//Destroy(spawned);//Destroy the enemy death particles
	}
	else if(this.transform.parent.gameObject.name == "MediumRangedEnemy" || this.transform.parent.gameObject.name == "MediumMeleeEnemy" || this.transform.parent.gameObject.name == "BigRangedEnemy" || this.transform.parent.gameObject.name == "BigMeleeEnemy")
	{
		Destroy(this.transform.parent.gameObject); //Destroy Medium and Big enemies.
		yield WaitForSeconds(2);//Wait to seconds before destroying the death particles
		Destroy(spawned);//Destroy the enemy death particles
	}
	else if(this.transform.parent.gameObject.name == "Antagonist")
	{
		yield WaitForSeconds(2);
		this.transform.parent.gameObject.SetActiveRecursively(false);
	}
	else if(this.transform.parent.gameObject.name == "Slave")
	{
		yield WaitForSeconds(8);
		this.transform.parent.gameObject.SetActiveRecursively(false);
	}
}
function OnGUI()
{
}
// After the object is spawned, check each frame if it's still there.
// Once it's not, activate the onDestroyedSignals and disable again.
function Update () {
	if (spawned == null || spawned.active == false) {
		onDestroyedSignals.SendSignals (this);
		enabled = false;
	}
}

function CheckPlayerPosition() : Transform[]
{
	var firstCheckPointDist : float = Vector3.Distance(player.transform.position, enemyCheckPoint3.position);

	var secondCheckPointDist : float = Vector3.Distance(player.transform.position, enemyCheckPoint4.position);

	var thirdCheckPointDist : float = Vector3.Distance(player.transform.position, enemyCheckPoint1.position);

	var fourthCheckPointDist : float = Vector3.Distance(player.transform.position, enemyCheckPoint2.position);

	var fifthCheckPointDist : float = Vector3.Distance(player.transform.position, enemyCheckPoint5.position);

	var horizontalDist : float = Vector3.Distance(enemyCheckPoint3.position, enemyCheckPoint4.position);

	var verticalDist : float = Vector3.Distance(enemyCheckPoint1.position, enemyCheckPoint2.position);

	var enemyCheckPoints : Transform[] = new Transform[9];

	//Just an initial value for the checkpoints array
	enemyCheckPoints = [enemyCheckPoint5, enemyCheckPoint5, enemyCheckPoint5, enemyCheckPoint5, enemyCheckPoint5, enemyCheckPoint5, enemyCheckPoint5, enemyCheckPoint5, enemyCheckPoint5, enemyCheckPoint5];

	if(firstCheckPointDist < horizontalDist * 0.5)
	{
		enemyCheckPoints[0] = enemyCheckPoint3;
	}
	else if(secondCheckPointDist < horizontalDist * 0.5)
	{
		enemyCheckPoints[0] = enemyCheckPoint4;
	}
	else
	{
		var checkPointChance = Random.Range(0, 2);
		if(checkPointChance == 0)
		{
			enemyCheckPoints[0] = enemyCheckPoint3;
		}
		if(checkPointChance == 1)
		{
			enemyCheckPoints[0] = enemyCheckPoint4;
		}
	}

	if(thirdCheckPointDist < verticalDist * 0.5)
	{
		enemyCheckPoints[1] = enemyCheckPoint1;
	}
	else if(fourthCheckPointDist < verticalDist * 0.5)
	{
		enemyCheckPoints[1] = enemyCheckPoint2;
	}
	else
	{
		var checkPointChance2 = Random.Range(0, 2);
		if(checkPointChance2 == 0)
		{
			enemyCheckPoints[0] = enemyCheckPoint3;
		}
		if(checkPointChance2 == 1)
		{
			enemyCheckPoints[0] = enemyCheckPoint4;
		}
	}

	if(enemyCheckPoints[0] == enemyCheckPoint3 && enemyCheckPoints[1] == enemyCheckPoint1)
	{
		if(enemyCheckPoint6.GetComponent.<PlayerInArea>().playerInArea == false)
		{
			enemyCheckPoints[2] = enemyCheckPoint6;
		}
		else
		{
			enemyCheckPoints[2] = enemyCheckPoint10;
		}
		
		if(enemyCheckPoint10.GetComponent.<PlayerInArea>().playerInArea == false)
		{
			enemyCheckPoints[3] = enemyCheckPoint10;
		}
		else
		{
			enemyCheckPoints[3] = enemyCheckPoint6;
		}
		
		if(enemyCheckPoint15.GetComponent.<PlayerInArea>().playerInArea == false)
		{
			enemyCheckPoints[4] = enemyCheckPoint15;
		}
		else
		{
			enemyCheckPoints[4] = enemyCheckPoint3;
		}
		
		if(enemyCheckPoint7.GetComponent.<PlayerInArea>().playerInArea == false)
		{
			enemyCheckPoints[5] = enemyCheckPoint7;
		}
		else
		{
			enemyCheckPoints[5] = enemyCheckPoint11;
		}
		
		if(enemyCheckPoint11.GetComponent.<PlayerInArea>().playerInArea == false)
		{
			enemyCheckPoints[6] = enemyCheckPoint11;
		}
		else
		{
			enemyCheckPoints[6] = enemyCheckPoint7;
		}
		
		if(enemyCheckPoint16.GetComponent.<PlayerInArea>().playerInArea == false)
		{
			enemyCheckPoints[7] = enemyCheckPoint16;
		}	
		else
		{
			enemyCheckPoints[7] = enemyCheckPoint17;
		}
		
		if(enemyCheckPoint17.GetComponent.<PlayerInArea>().playerInArea == false)
		{
			enemyCheckPoints[8] = enemyCheckPoint17;
		}	
		else
		{
			enemyCheckPoints[8] = enemyCheckPoint16;
		}
		
	}
	
	else if(enemyCheckPoints[0] == enemyCheckPoint3 && enemyCheckPoints[1] == enemyCheckPoint2)
	{
		if(enemyCheckPoint9.GetComponent.<PlayerInArea>().playerInArea == false)
		{
			enemyCheckPoints[2] = enemyCheckPoint9;
		}
		else
		{
			enemyCheckPoints[2] = enemyCheckPoint13;
		}

		if(enemyCheckPoint13.GetComponent.<PlayerInArea>().playerInArea == false)
		{
			enemyCheckPoints[3] = enemyCheckPoint13;
		}
		else
		{
			enemyCheckPoints[3] = enemyCheckPoint9;
		}
		
		if(enemyCheckPoint14.GetComponent.<PlayerInArea>().playerInArea == false)
		{
			enemyCheckPoints[4] = enemyCheckPoint14;
		}
		else
		{
			enemyCheckPoints[4] = enemyCheckPoint1;
		}
		
		if(enemyCheckPoint8.GetComponent.<PlayerInArea>().playerInArea == false)
		{
			enemyCheckPoints[5] = enemyCheckPoint8;
		}
		else
		{
			enemyCheckPoints[5] = enemyCheckPoint12;
		}
		
		if(enemyCheckPoint12.GetComponent.<PlayerInArea>().playerInArea == false)
		{
			enemyCheckPoints[6] = enemyCheckPoint12;
		}
		else
		{
			enemyCheckPoints[6] = enemyCheckPoint8;
		}
		
		if(enemyCheckPoint18.GetComponent.<PlayerInArea>().playerInArea == false)
		{
			enemyCheckPoints[7] = enemyCheckPoint18;
		}	
		else
		{
			enemyCheckPoints[7] = enemyCheckPoint19;
		}
		
		if(enemyCheckPoint19.GetComponent.<PlayerInArea>().playerInArea == false)
		{
			enemyCheckPoints[8] = enemyCheckPoint19;
		}	
		else
		{
			enemyCheckPoints[8] = enemyCheckPoint18;
		}
		
	}
	else if(enemyCheckPoints[0] == enemyCheckPoint4 && enemyCheckPoints[1] == enemyCheckPoint1)
	{
		if(enemyCheckPoint7.GetComponent.<PlayerInArea>().playerInArea == false)
		{
			enemyCheckPoints[2] = enemyCheckPoint7;
		}
		else
		{
			enemyCheckPoints[2] = enemyCheckPoint11;
		}

		if(enemyCheckPoint11.GetComponent.<PlayerInArea>().playerInArea == false)
		{
			enemyCheckPoints[3] = enemyCheckPoint11;
		}
		else
		{
			enemyCheckPoints[3] = enemyCheckPoint7;
		}
		
		if(enemyCheckPoint15.GetComponent.<PlayerInArea>().playerInArea == false)
		{
			enemyCheckPoints[4] = enemyCheckPoint15;
		}
		else
		{
			enemyCheckPoints[4] = enemyCheckPoint4;
		}
		
		if(enemyCheckPoint10.GetComponent.<PlayerInArea>().playerInArea == false)
		{
			enemyCheckPoints[5] = enemyCheckPoint10;
		}
		else
		{
			enemyCheckPoints[5] = enemyCheckPoint6;
		}
		
		if(enemyCheckPoint6.GetComponent.<PlayerInArea>().playerInArea == false)
		{
			enemyCheckPoints[6] = enemyCheckPoint6;
		}
		else
		{
			enemyCheckPoints[6] = enemyCheckPoint10;
		}
		
		if(enemyCheckPoint16.GetComponent.<PlayerInArea>().playerInArea == false)
		{
			enemyCheckPoints[7] = enemyCheckPoint16;
		}	
		else
		{
			enemyCheckPoints[7] = enemyCheckPoint17;
		}
		
		if(enemyCheckPoint17.GetComponent.<PlayerInArea>().playerInArea == false)
		{
			enemyCheckPoints[8] = enemyCheckPoint17;
		}	
		else
		{
			enemyCheckPoints[8] = enemyCheckPoint16;
		}
		
	}
	else if(enemyCheckPoints[0] == enemyCheckPoint4 && enemyCheckPoints[1] == enemyCheckPoint2)
	{
		if(enemyCheckPoint8.GetComponent.<PlayerInArea>().playerInArea == false)
		{
			enemyCheckPoints[2] = enemyCheckPoint8;
		}
		else
		{
			enemyCheckPoints[2] = enemyCheckPoint12;
		}

		if(enemyCheckPoint12.GetComponent.<PlayerInArea>().playerInArea == false)
		{
			enemyCheckPoints[3] = enemyCheckPoint12;
		}
		else
		{
			enemyCheckPoints[3] = enemyCheckPoint8;
		}
	
		if(enemyCheckPoint14.GetComponent.<PlayerInArea>().playerInArea == false)
		{
			enemyCheckPoints[4] = enemyCheckPoint14;
		}
		else
		{
			enemyCheckPoints[4] = enemyCheckPoint4;
		}
		
		if(enemyCheckPoint13.GetComponent.<PlayerInArea>().playerInArea == false)
		{
			enemyCheckPoints[5] = enemyCheckPoint13;
		}
		else
		{
			enemyCheckPoints[5] = enemyCheckPoint9;
		}
		
		if(enemyCheckPoint9.GetComponent.<PlayerInArea>().playerInArea == false)
		{
			enemyCheckPoints[6] = enemyCheckPoint9;
		}
		else
		{
			enemyCheckPoints[6] = enemyCheckPoint13;
		}
		
		if(enemyCheckPoint18.GetComponent.<PlayerInArea>().playerInArea == false)
		{
			enemyCheckPoints[7] = enemyCheckPoint18;
		}	
		else
		{
			enemyCheckPoints[7] = enemyCheckPoint19;
		}
		
		if(enemyCheckPoint19.GetComponent.<PlayerInArea>().playerInArea == false)
		{
			enemyCheckPoints[8] = enemyCheckPoint19;
		}	
		else
		{
			enemyCheckPoints[8] = enemyCheckPoint18;
		}
		
	}
	else
	{
		enemyCheckPoints[0] = enemyCheckPoint1;
		enemyCheckPoints[1] = enemyCheckPoint2;
		enemyCheckPoints[2] = enemyCheckPoint3;
		enemyCheckPoints[3] = enemyCheckPoint4;
		enemyCheckPoints[4] = enemyCheckPoint5;
		enemyCheckPoints[5] = enemyCheckPoint14;
		enemyCheckPoints[6] = enemyCheckPoint15;
		enemyCheckPoints[7] = enemyCheckPoint16;
		enemyCheckPoints[8] = enemyCheckPoint18;
	}
	return enemyCheckPoints;
}