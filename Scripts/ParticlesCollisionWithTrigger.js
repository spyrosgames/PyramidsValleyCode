#pragma strict
private var damageAmount : float;

function Awake()
{
	damageAmount = 100;
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
		}
		Debug.Log("Hi, I'm a shuriken magic and I've hit the " + other.transform.tag);
	}
}