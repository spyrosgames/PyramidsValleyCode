#pragma strict

// Public member data
public var motor : MovementMotor;

public var weaponBehaviours : MonoBehaviour[];
public var fireFrequency : float = 2;

// Private memeber data
private var ai : AI;
private var character : Transform;


private var firing : boolean = false;
private var lastFireTime : float = -1;
private var nextWeaponToFire : int = 0;

private var globals : Globals;

public var slaveMesh : GameObject;
public var shootingWhileWalking : AnimationClip;
public var shootingWhileStandstill : AnimationClip;
private var slaveAttackAI : SlaveAttackAI;

function Awake () {
	globals = Globals.GetInstance();
	
	character = motor.transform;

	slaveAttackAI = transform.parent.GetComponentInChildren.<SlaveAttackAI> ();
}

function OnDisable () {
	Shoot(false);
}

function Shoot(state : boolean) {
	firing = state;
}

function Fire () {
	//Play the ranged enemy attack animation here
	if(transform.parent.gameObject.rigidbody.velocity == Vector3(0, 0, 0))
	{
		slaveMesh.animation.CrossFade(shootingWhileStandstill.name, 0.1, PlayMode.StopAll);
	}
	else if(transform.parent.gameObject.rigidbody.velocity != Vector3(0, 0, 0))
	{
		slaveMesh.animation.CrossFade(shootingWhileWalking.name, 0.1, PlayMode.StopAll);
	}
	if (weaponBehaviours[nextWeaponToFire]) {
		weaponBehaviours[nextWeaponToFire].SendMessage ("Fire");
		nextWeaponToFire = (nextWeaponToFire + 1) % weaponBehaviours.Length;
		lastFireTime = Time.time;
	}
}

function Update () {
	if(slaveAttackAI.CanSeeEnemy())
	{
		Shoot(true);
	}
	if (firing) {
		if (Time.time > lastFireTime + 1 / fireFrequency) {
			Fire ();
		}
	}
}
