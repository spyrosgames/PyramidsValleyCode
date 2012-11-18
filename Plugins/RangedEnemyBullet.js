#pragma strict
private var globals : Globals;
public var damageAmount : float;
private var simpleBulletObject : SimpleBullet;

function Awake()
{
	globals = Globals.GetInstance();
	damageAmount = globals.rangedEnemyDamage;
	if(damageAmount == 0)
	{
		damageAmount = 5;
		globals.rangedEnemyDamage = 5;
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
			simpleBulletObject.dist = 0;
		}
		Debug.Log("Hi, I'm a ranged bullet and I've hit the player");
	}
}