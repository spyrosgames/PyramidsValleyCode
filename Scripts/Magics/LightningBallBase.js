#pragma strict
private var damageAmount : float;
public var lightningBallExplosionEffect : GameObject;
private var simpleBulletObject : SimpleBullet;

function Awake()
{
	damageAmount = 5; //to be changed
	simpleBulletObject = GetComponent.<SimpleBullet>();
}

function OnTriggerEnter(other : Collider)
{
	if(other.transform.tag == "Enemy")
	{
		var targetHealth : Health = other.transform.GetComponent.<Health>();
		if (targetHealth && targetHealth.health > 0 && targetHealth.dead == false) {
			// Apply damage
			//targetHealth.OnDamage (damagePerSecond / frequency, -spawnPoint.forward);
			targetHealth.OnDamage (damageAmount, other.transform.forward);
			//Instantiate the explosion GO
			Spawner.Spawn (lightningBallExplosionEffect, transform.position, transform.rotation);
			//
			simpleBulletObject.dist = 0;
		}
	}
}