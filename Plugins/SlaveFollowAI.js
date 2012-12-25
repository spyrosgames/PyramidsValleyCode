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
	/*
	if(slaveWalkingSpeed == 0)
	{
		slaveWalkingSpeed = 14;
		globals.slaveWalkingSpeed = 14;
		PlayerPrefs.SetFloat("slaveWalkingSpeed", slaveWalkingSpeed);
	}
	
	navMeshAgent.speed = slaveWalkingSpeed;
	*/
	
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
		navMeshAgent.destination = Vector3(player.transform.position.x + 3, player.transform.position.y, player.transform.position.z + 3);

		if(Vector3.Distance(Vector3(player.transform.position.x + 3, player.transform.position.y, player.transform.position.z + 3), transform.position) > maxDistance)
		{
			
			navMeshAgent.speed = slaveWalkingSpeed;
			
			firingHitInfo = firingRayCast.GetHitInfo();
				
			if(firingHitInfo.transform != null && firingHitInfo.transform.tag == "Enemy" && firingHitInfo.distance <= 8 )
			{
				if(firingHitInfo.transform.gameObject.GetComponent.<Health>().health > 0 && firingHitInfo.transform.gameObject.GetComponent.<Health>().dead == false)
				{
					firing = true;
					
					//transform.LookAt(Vector3(firingHitInfo.transform.position.x, transform.position.y, firingHitInfo.transform.position.z));
					
					//Smooth Look At between targets
					//var rotation = Quaternion.LookRotation(firingHitInfo.transform.position - transform.position);
					//transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * 6);
					//
					
					slaveMesh.animation.CrossFade(attackWhileWalkingAnimation.name, 0.2);
					slaveMesh.animation[attackWhileWalkingAnimation.name].speed = 0.6;
					
					navMeshAgent.destination = firingHitInfo.transform.position;
				}
				else
				{
					firing = false;
					slaveMesh.animation.CrossFade(walkAnimation.name, 0.2);
					slaveMesh.animation[walkAnimation.name].speed = 0.6;
					
					navMeshAgent.destination = Vector3(player.transform.position.x + 3, player.transform.position.y, player.transform.position.z + 3);

				}
			}
			else
			{
				firing = false;
				slaveMesh.animation.CrossFade(walkAnimation.name, 0.2);
				slaveMesh.animation[walkAnimation.name].speed = 0.6;
				
				navMeshAgent.destination = Vector3(player.transform.position.x + 3, player.transform.position.y, player.transform.position.z + 3);
			}
		}
		else
		{
			navMeshAgent.speed = 0;
			if(firingHitInfo.transform != null && firingHitInfo.transform.tag == "Enemy" && firingHitInfo.distance <= 8)
			{
				if(firingHitInfo.transform.gameObject.GetComponent.<Health>().health > 0 && firingHitInfo.transform.gameObject.GetComponent.<Health>().dead == false)
				{
					firing = true;
					slaveMesh.animation.CrossFade(attackWhileStandStillAnimation.name, 0.2);
					navMeshAgent.destination = firingHitInfo.transform.position;
				}
				else
				{
					firing = false;
					slaveMesh.animation.CrossFade(idleAnimation.name, 0.2);
					navMeshAgent.destination = Vector3(player.transform.position.x + 3, player.transform.position.y, player.transform.position.z + 3);
				}
			}
			else
			{
				firing = false;
				slaveMesh.animation.CrossFade(idleAnimation.name, 0.2);
				navMeshAgent.destination = Vector3(player.transform.position.x + 3, player.transform.position.y, player.transform.position.z + 3);
			}
		}
		
		if (firing) {
			if (Time.time > lastFireTime + 1 / fireFrequency) {
				Fire ();
			}
		}
	}	
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