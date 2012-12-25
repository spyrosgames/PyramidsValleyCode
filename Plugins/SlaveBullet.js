#pragma strict
//public var AutoFireComponent : GameObject;
private var damagePerSecond : float;
private var frequency : float;
private var spawnPoint : Transform;
private var globals = Globals.GetInstance();
private var simpleBulletObject : SimpleBullet;

function Awake()
{
	globals = Globals.GetInstance();
	
	damagePerSecond = globals.slaveDamage;
	frequency = globals.slaveShootingFrequency;
	
	if(damagePerSecond == 0)
	{
		damagePerSecond = 7.5;
		globals.slaveDamage = 7.5;
		PlayerPrefs.SetFloat("slaveDamage", damagePerSecond);
	}
	if(frequency == 0)
	{
		frequency = 3;
		globals.slaveShootingFrequency = 3;
		PlayerPrefs.SetFloat("slaveShootingFrequency", 3);
	}
	simpleBulletObject = GetComponent.<SimpleBullet>();

}


function OnTriggerEnter(other : Collider)
{
	Debug.Log("I'm the new shitty script and I'm being called now");
	if(other.transform.tag == "Enemy")
	{
		var targetHealth : Health = other.transform.GetComponent.<Health>();
		if (targetHealth && targetHealth.health > 0 && targetHealth.dead == false) {
			// Apply damage
			//targetHealth.OnDamage (damagePerSecond / frequency, -spawnPoint.forward);
			targetHealth.OnDamage (damagePerSecond / frequency, other.transform.forward);
			simpleBulletObject.dist = 0;
		}
		Debug.Log("Hi, I'm a slave bullet and I've hit an enemy");	
	}
	
}