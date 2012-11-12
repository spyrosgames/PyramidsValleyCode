#pragma strict
//public var AutoFireComponent : GameObject;
private var damagePerSecond : float;
private var frequency : float;
private var spawnPoint : Transform;

function Awake()
{

	damagePerSecond = 7.5;
	frequency = 3;
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
		}
		Debug.Log("Hi, I'm a bullet and I've hit an enemy");	
	}
	
}