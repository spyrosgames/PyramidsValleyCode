#pragma strict

// Public member data
public var motor : MovementMotor;

public var targetDistanceMin : float = 2.0;
public var targetDistanceMax : float = 3.0;

public var weaponBehaviours : MonoBehaviour[];
public var fireFrequency : float = 2;

// Private memeber data
private var ai : AI;
private var character : Transform;
private var player : Transform;
private var playerHealth : Health;
public var inRange : boolean = false;

private var nextRaycastTime : float = 0;
private var lastRaycastSuccessfulTime : float = 0;
private var noticeTime : float = 0;

private var firing : boolean = false;
private var lastFireTime : float = -1;
private var nextWeaponToFire : int = 0;

private var playerDirection : Vector3;
public var enemyBody : GameObject;

public var idleAnimation : AnimationClip;
private var globals : Globals;

function Awake () {
	globals = Globals.GetInstance();
	
	character = motor.transform;
	player = GameObject.FindWithTag ("Player").transform;
	playerHealth = player.GetComponent.<Health>();
	ai = transform.parent.GetComponentInChildren.<AI> ();
}

function OnEnable () {
	inRange = false;
	//pyramidInRange = false;
	nextRaycastTime = Time.time + 1;
	lastRaycastSuccessfulTime = Time.time;
	noticeTime = Time.time;
}

function OnDisable () {
	Shoot(false);
}
/*
function OnSignal()
{
	Shoot(false);
}
*/
function Shoot(state : boolean) {
	firing = state;
}

function Fire () {
	//Play the ranged enemy attack animation here
	if (weaponBehaviours[nextWeaponToFire]) {
		weaponBehaviours[nextWeaponToFire].SendMessage ("Fire");
		nextWeaponToFire = (nextWeaponToFire + 1) % weaponBehaviours.Length;
		lastFireTime = Time.time;
	}
}

function Update () {
	// Calculate the direction from the player to this character
	playerDirection = (player.position - character.position);


	playerDirection.y = 0;

	var playerDist : float = playerDirection.magnitude;
	playerDirection /= playerDist;
	

	// Set this character to face the player,
	// that is, to face the direction from this character to the player
	motor.facingDirection = playerDirection;
	/*motor.facingDirection = pyramidDirection;*/
	// For a short moment after noticing player,
	// only look at him but don't walk towards or attack yet.
	if (Time.time < noticeTime + 1.5) {
		motor.movementDirection = Vector3.zero;
		return;
	}
	
	//if(playerDist < pyramidDist && playerDist < raaFighterDist)
	//{
		if (inRange && playerDist > targetDistanceMax)
		{
			inRange = false;
		}
		if (!inRange && playerDist < targetDistanceMin)
		{
			inRange = true;
		}
	//}

	/*
	if(inRange && pyramidDist > targetDistanceMax)
		inRange = false;
	if(!inRange && pyramidDist < targetDistanceMin)
		inRange = true;
	*/

	if (inRange)
	{
		motor.movementDirection = Vector3.zero;
	}
	else
	{
		motor.movementDirection = playerDirection;
	}

	//if (Time.time > nextRaycastTime) {
		//nextRaycastTime = Time.time + 1;
			//if (ai.CanSeePlayer ()) {
				
				//lastRaycastSuccessfulTime = Time.time;
				if (IsAimingAtPlayer ())
				{
					Shoot(true);
				}
				else
				{
					Shoot(false);
				}
			//}
			//else {
				//Shoot (false);
			//}
	//}
	
	if (firing) {
		if(playerHealth.health > 0 && transform.parent.GetComponent.<Health>().health > 0)
		{
			if (Time.time > lastFireTime + 1 / fireFrequency) {
				Fire ();
			}
		}
	}
}

function IsAimingAtPlayer () : boolean {
	
	var distance : float = Vector3.Distance(player.transform.position, character.transform.position);
	if(distance < globals.rangedEnemyAIStoppingDistance)
	{
		Debug.Log("I'm the ranged enemy and I'll attack the player now");
		return true;
	}
	
	return false;
}