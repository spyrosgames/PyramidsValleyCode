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

private var inRange : boolean = false;


private var nextRaycastTime : float = -1;
private var lastRaycastSuccessfulTime : float = 0;
private var noticeTime : float = 0;

public var firing : boolean = false;
private var lastFireTime : float = -1;
private var nextWeaponToFire : int = 0;

private var playerDirection : Vector3;

private var currentCharacterToAttack : Transform;

public var damagePerSecond : float;
public var forcePerSecond : float = 5.0;

public var strike1Animation : AnimationClip;
public var strike2Animation : AnimationClip;
public var hitAnimation : AnimationClip;
public var idleAnimation : AnimationClip;

public var enemyBody : GameObject;
private var globals : Globals;

function Awake () {
	globals = Globals.GetInstance();
	
	damagePerSecond = globals.meleeEnemyDamage;
	if(damagePerSecond == 0)
	{
		damagePerSecond = 1;
		globals.meleeEnemyDamage = 1;
		PlayerPrefs.SetFloat("meleeEnemyDamage", damagePerSecond);
	}
	
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
	
	var targetHealth : Health = currentCharacterToAttack.transform.GetComponent.<Health> ();
	if (targetHealth) {
		// Apply damage
		targetHealth.OnDamage (damagePerSecond, -currentCharacterToAttack.transform.forward);
	}
	
	/*
		// Get the rigidbody if any
	if (currentCharacterToAttack.rigidbody) {
			// Apply force to the target object at the position of the hit point
			var force : Vector3 = currentCharacterToAttack.transform.forward * (forcePerSecond);
			currentCharacterToAttack.rigidbody.AddForceAtPosition (force, currentCharacterToAttack.transform.position, ForceMode.Impulse);
	}
	*/
	lastFireTime = Time.time;
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
	
	if (inRange && playerDist > targetDistanceMax)
	{
		inRange = false;
	}
	if (!inRange && playerDist < targetDistanceMin)
	{
		inRange = true;
	}

	
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
			if (ai.CanSeePlayer()) {
				lastRaycastSuccessfulTime = Time.time;
				if (IsAimingAtPlayer ())
				{
					currentCharacterToAttack = player;
					Shoot(true);
				}
				else
				{
					Shoot(false);
					//enemyBody.animation.CrossFadeQueued(idleAnimation.name, 0, QueueMode.CompleteOthers);
				}
			}
			else {
				Shoot (false);
				//enemyBody.animation.CrossFadeQueued(idleAnimation.name, 0, QueueMode.CompleteOthers);
				if (Time.time > lastRaycastSuccessfulTime + 5) {
					ai.OnLostTrack ();
				}
			}
	//}
	
	if (firing) {
		if(playerHealth.health > 0 && transform.parent.GetComponent.<Health>().health > 0)
		{
			if (Time.time > lastFireTime + 1 / fireFrequency) {
				Fire ();
			}
			else
			{
				enemyBody.animation.CrossFadeQueued(idleAnimation.name, 0, QueueMode.CompleteOthers);
			}
		}
		else
		{
			enemyBody.animation.CrossFadeQueued(idleAnimation.name, 0, QueueMode.CompleteOthers);
		}
	}
}
function SmoothLookAt()
{
	//var rotation = Quaternion.LookRotation(player.position - character.position);
	//character.rotation = Quaternion.Slerp(character.rotation, rotation, Time.deltaTime * 6);

	var lookAtPlayer = Quaternion.LookRotation(player.transform.position - motor.transform.position);
    motor.transform.rotation = Quaternion.Slerp(motor.transform.rotation, lookAtPlayer , Time.deltaTime / 5);
}

function IsAimingAtPlayer () : boolean {
	//transform.parent.transform.LookAt(Vector3(player.transform.position.x, transform.parent.transform.position.y, player.transform.position.z));
	/*
	var playerDirection : Vector3 = (player.position - character.transform.position);
	playerDirection.y = 0;
	if(Vector3.Angle (character.transform.forward, playerDirection) < 1)
	{
		return true;
	}
	*/
	
	var distance : float = Vector3.Distance(player.transform.position, character.transform.position);
	
	if(distance < 4)
	{
		return true;
	}
	
	return false;
}

function PlayAttackAnimation()
{
	var randomAnimation : int = Random.Range(0, 2);
	var currentAttackAnimation : AnimationClip = strike1Animation;
	//enemyBody.animation[currentAttackAnimation.name].blendMode = AnimationBlendMode.Blend;
	var animationSpeed : float;


	if(randomAnimation == 0)
	{
		currentAttackAnimation = strike1Animation;
		animationSpeed = 0.9;
		//animationSpeed = 1.2;

	}
	else if(randomAnimation == 1)
	{
		currentAttackAnimation = strike2Animation;
		animationSpeed = 0.95;
		//animationSpeed = 1.25;
	}

	enemyBody.animation.CrossFade(currentAttackAnimation.name, 0, PlayMode.StopAll);
	enemyBody.animation[currentAttackAnimation.name].speed = animationSpeed;
}
