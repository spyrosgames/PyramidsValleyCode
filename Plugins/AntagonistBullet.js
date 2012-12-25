#pragma strict
private var globals : Globals;
public var damageAmount : float;
public var lightningBallExplosionEffect : GameObject;
private var simpleBulletObject : SimpleBullet;

function Awake()
{
	globals = Globals.GetInstance();
	damageAmount = globals.antagonistDamage;
	if(damageAmount == 0)
	{
		damageAmount = 20;
		globals.antagonistDamage = 20;
		//PlayerPrefs.SetFloat("rangedEnemyDamage", 5);
	}
	
	simpleBulletObject = GetComponent.<SimpleBullet>();
	
}

function OnTriggerEnter(other : Collider)
{
	if(other.transform.tag == "Player")
	{
		var targetHealth : Health = other.transform.GetComponent.<Health>();
		if (targetHealth && targetHealth.health > 0 && targetHealth.dead == false) {
			// Apply damage
			//targetHealth.OnDamage (damagePerSecond / frequency, -spawnPoint.forward);
			targetHealth.OnDamage (damageAmount, other.transform.forward);
			Spawner.Spawn (lightningBallExplosionEffect, transform.position, transform.rotation);
			simpleBulletObject.dist = 0;
		}
		Debug.Log("Hi, I'm an antagonist bullet and I've hit the player");
	}
}