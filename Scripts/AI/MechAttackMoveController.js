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

private var globals : Globals;

public var rangedEnemyMesh : GameObject;

public var shootingAnimation : AnimationClip;
public var idleAnimation : AnimationClip;

private var animationSpeed : float = 0.3;

function Awake () {
	globals = Globals.GetInstance();
	
	character = motor.transform;
	player = GameObject.FindWithTag ("Player").transform;
	playerHealth = player.GetComponent.<Health>();
	ai = transform.parent.GetComponentInChildren.<AI> ();
}

function OnEnable () {
	inRange = false;
	nextRaycastTime = Time.time + 1;
	lastRaycastSuccessfulTime = Time.time;
	noticeTime = Time.time;
}

function OnDisable () {
	Shoot(false);
}

function Shoot(state : boolean) {
	firing = state;
}

function Fire () {

	PlayAttackAnimation();

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
				if (IsAimingAtPlayer () && globals.isEnemyStunned == false && playerHealth.dead == false && this.transform.parent.gameObject.rigidbody.velocity == Vector3(0, 0, 0))
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
		if(playerHealth.dead == false && transform.parent.GetComponent.<Health>().dead == false)
		{
			if (Time.time > lastFireTime + 1 / fireFrequency) {
				Fire ();
			}
			else
			{
				if(this.transform.parent.transform.name == "RangedEnemy")
				{
					rangedEnemyMesh.animation.CrossFadeQueued(shootingAnimation.name, 0.1);
				}
			}
		}
		else
		{
			if(this.transform.parent.transform.name == "RangedEnemy")
			{
				rangedEnemyMesh.animation.CrossFadeQueued(idleAnimation.name, 0.1);
			}
		}
	}
	else
	{
		if(this.transform.parent.transform.name == "RangedEnemy")
		{
			rangedEnemyMesh.animation.CrossFadeQueued(idleAnimation.name, 0.1);	
		}	
	}
}

function IsAimingAtPlayer () : boolean {
	
	var distance : float = Vector3.Distance(player.transform.position, character.transform.position);
	if(this.transform.parent.transform.name == "RangedEnemy")
	{
		if(distance <= globals.rangedEnemyAIStoppingDistance) 
		{
			Debug.Log("I'm the " + gameObject.transform.parent.name + " and I'll attack the player now");
			return true;
		}
	}
	if(this.transform.parent.transform.name == "Antagonist")
	{
		if(distance <= globals.antagonistAIStoppingDistance) 
		{
			Debug.Log("I'm the " + gameObject.transform.parent.name + " and I'll attack the player now");
			return true;
		}
	}
	return false;
}

function PlayAttackAnimation()
{
	if(this.transform.parent.transform.name == "RangedEnemy")
	{
		rangedEnemyMesh.animation.CrossFade(shootingAnimation.name, 0.2);
		rangedEnemyMesh.animation[shootingAnimation.name].speed = animationSpeed;
	}
	if(this.transform.parent.transform.name == "Antagonist")
	{
	
	}	
}