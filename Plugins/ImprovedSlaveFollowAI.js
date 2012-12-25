#pragma strict
private var player : GameObject;
private var playerHealth : Health;
private var slaveHealth : Health;

private var globals : Globals;
private var navMeshAgent : NavMeshAgent;
private var slaveWalkingSpeed : float;

private var maxDistance : float;

public var walkAnimation : AnimationClip;
public var idleAnimation : AnimationClip;
public var deathAnimation : AnimationClip;
public var attackWhileWalkingAnimation : AnimationClip;
public var attackWhileStandStillAnimation : AnimationClip;

public var slaveMesh : GameObject;
public var AIComponent : GameObject;

private var firingRayCast : SlavePerFrameRaycast;
private var firingHitInfo : RaycastHit;

private var firing : boolean = false;
private var lastFireTime : float = -1;
private var nextWeaponToFire : int = 0;
public var weaponBehaviours : MonoBehaviour[];
public var fireFrequency : float = 2;

public var AIPointToFollow : GameObject;

private var enemiesInRange : Collider[];
private var enemiesOurOfRange : Collider[];
private var currentEnemyToAttack : Collider;
private var nextEnemyToAttack : Collider;
private var rotation : Quaternion;

function Awake()
{
	globals = Globals.GetInstance();
	
	firingRayCast = GetComponent.<SlavePerFrameRaycast>();

	player = GameObject.FindWithTag("Player");
	navMeshAgent = GetComponent.<NavMeshAgent>();
	
	playerHealth = player.GetComponent.<Health>();
	slaveHealth = GetComponent.<Health>();
	
	maxDistance = globals.slaveAIStoppingDistance;
	
	slaveWalkingSpeed = globals.slaveWalkingSpeed;
	if(slaveWalkingSpeed == 0)
	{
		slaveWalkingSpeed = 8;
		globals.slaveWalkingSpeed = 8;
		PlayerPrefs.SetFloat("slaveWalkingSpeed", slaveWalkingSpeed);
	}
	navMeshAgent.speed = slaveWalkingSpeed;
	
	
	slaveMesh.animation[walkAnimation.name].layer = 1;
	slaveMesh.animation[idleAnimation.name].layer = 1;
	slaveMesh.animation[attackWhileWalkingAnimation.name].layer = 1;
	slaveMesh.animation[attackWhileStandStillAnimation.name].layer = 1;
	slaveMesh.animation[deathAnimation.name].layer = 1;
	
	slaveMesh.animation.SyncLayer(1);
}

function Start () {

}

function Update () {
	if(playerHealth.dead == false && slaveHealth.dead == false)
	{		
		navMeshAgent.speed = slaveWalkingSpeed;
		
		GetNearestEnemy();
		
		firingHitInfo = firingRayCast.GetHitInfo();
			
		if(firingHitInfo.collider != null && firingHitInfo.collider.transform.tag != "Enemy")
		{
			Debug.Log("Searching for another enemy...");
			
			currentEnemyToAttack = nextEnemyToAttack;
			
			Debug.Log("currentEnemyToAttack " + currentEnemyToAttack);			
		}
		
		var currentEnemyHealth : Health = currentEnemyToAttack.gameObject.GetComponent.<Health>();	
		if(currentEnemyToAttack != null && currentEnemyHealth.dead == false && currentEnemyHealth.health > 0)
		{

			/*
			if(firingHitInfo.collider != null && firingHitInfo.collider.transform.tag == "Enemy")
			{
				var enemyHealth = firingHitInfo.collider.gameObject.GetComponent.<Health>();
				
				if(enemyHealth.dead == true || enemyHealth.health == 0)
				{
					currentEnemyToAttack = nextEnemyToAttack;
				}				
			}
			*/
			navMeshAgent.destination = currentEnemyToAttack.transform.position;
			
			var lookPos : Vector3 = currentEnemyToAttack.transform.position - transform.position;
			lookPos.y = 0;
			
			//Smooth Look At between targets
			rotation = Quaternion.LookRotation(lookPos);
			
			transform.rotation = Quaternion.Slerp(transform.rotation, rotation * Quaternion.Euler(0, -8, 0), Time.deltaTime * 2);
			//
				
			if(Vector3.Distance(transform.position, currentEnemyToAttack.transform.position) > navMeshAgent.stoppingDistance)
			{
				slaveMesh.animation.CrossFade(attackWhileWalkingAnimation.name, 0.2);
				slaveMesh.animation[attackWhileWalkingAnimation.name].speed = 0.6;
				
			}
			else
			{
				 slaveMesh.animation.CrossFade(attackWhileStandStillAnimation.name, 0.2);
				 slaveMesh.animation[attackWhileStandStillAnimation.name].speed = 0.6;
			}		
				
			firing = true;
		}	
		else
		{
			navMeshAgent.destination = Vector3(player.transform.position.x + 3, player.transform.position.y, player.transform.position.z + 3);
			
			firing = false; 
			
			if(Vector3.Distance(transform.position, Vector3(player.transform.position.x + 3, player.transform.position.y, player.transform.position.z + 3)) > navMeshAgent.stoppingDistance)
			{
				slaveMesh.animation.CrossFade(walkAnimation.name, 0.2);
				slaveMesh.animation[walkAnimation.name].speed = 0.6;
			}
			else
			{
			 	slaveMesh.animation.CrossFade(idleAnimation.name, 0.2, PlayMode.StopAll);
			}
			currentEnemyToAttack = nextEnemyToAttack;
			
			Debug.Log("idle 2");
		} 
				
	}
	else if(playerHealth.dead == true && slaveHealth.dead == false)
	{
		firing = false;
		slaveMesh.animation.CrossFade(idleAnimation.name, 0.2, PlayMode.StopAll);
	}
	
	if (firing) {
		if (Time.time > lastFireTime + 1 / fireFrequency) {
			Fire ();
		}
		
	}
		
	/*
	if(firing)
	{
		firingHitInfo = firingRayCast.GetHitInfo();
		
		if(firingHitInfo.collider != null && firingHitInfo.collider.transform.tag != "Enemy")
		{
			Debug.Log("Switching");
			firing = false;
			
			currentEnemyToAttack = nextEnemyToAttack;
			
			navMeshAgent.destination = nextEnemyToAttack.transform.position;
			
			if(Vector3.Distance(transform.position, nextEnemyToAttack.transform.position) > navMeshAgent.stoppingDistance)
			{
				slaveMesh.animation.CrossFade(attackWhileWalkingAnimation.name, 0.2);
				slaveMesh.animation[attackWhileWalkingAnimation.name].speed = 0.6;
				
			}
			else
			{
				 slaveMesh.animation.CrossFade(attackWhileStandStillAnimation.name, 0.2);
				 slaveMesh.animation[attackWhileStandStillAnimation.name].speed = 0.6;
			}
		}
	}
	*/
}

function Fire () {
	if (weaponBehaviours[nextWeaponToFire]) {
		weaponBehaviours[nextWeaponToFire].SendMessage ("Fire");
		nextWeaponToFire = (nextWeaponToFire + 1) % weaponBehaviours.Length;
		lastFireTime = Time.time;
	}
}

function OnAnimationSignal()
{
	Debug.Log("Slave is dead");
	navMeshAgent.Stop(true);
	slaveMesh.animation.CrossFade(deathAnimation.name, 0.1, PlayMode.StopAll);
	slaveMesh.animation[deathAnimation.name].speed = 0.33;
	transform.position.y += 0.35;
}

function GetNearestEnemy()
{
	enemiesInRange = Physics.OverlapSphere(transform.position, 40, ~11);
	
	for(var i : int = 0; i < enemiesInRange.length; i++)
	{
		if(enemiesInRange[i].transform.tag == "Enemy" && enemiesInRange[i].transform.gameObject.GetComponent.<Health>().health > 0 && enemiesInRange[i].transform.gameObject.GetComponent.<Health>().dead == false)
		{
			if(Vector3.Distance(transform.position, enemiesInRange[i].transform.position) <= 40)
			{
				currentEnemyToAttack = enemiesInRange[i];

				//nextEnemyToAttack = enemiesInRange[Random.Range(0, enemiesInRange.length)];
				if(i >= 1)
				{
					nextEnemyToAttack = enemiesInRange[i - 1];
				}
			}
			else
			{
				currentEnemyToAttack = null;
			}
		}
	}
	//return currentEnemyToAttack;
}