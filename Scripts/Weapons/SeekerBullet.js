#pragma strict

public var speed : float = 15.0;
public var lifeTime : float = 1.5;
public var damageAmount : float;
public var forceAmount : float = 5;
public var radius : float = 1.0;
public var seekPrecision : float = 1.3;
public var ignoreLayers : LayerMask;
public var noise : float = 0.0;
public var explosionPrefab : GameObject;

private var dir : Vector3;
private var spawnTime : float;
private var targetObject : GameObject;
private var tr : Transform;
private var sideBias : float;

private var globals : Globals;

function Awake()
{
	globals = Globals.GetInstance();
	damageAmount = globals.rangedEnemyDamage;
	if(damageAmount == 0)
	{
		damageAmount = 5;
		globals.rangedEnemyDamage = 5;
		PlayerPrefs.SetFloat("rangedEnemyDamage", 5);
	}
	targetObject = GameObject.FindWithTag ("Player");
}

function OnEnable () {
	tr = transform;
	dir = transform.forward;
	spawnTime = Time.time;
	sideBias = Mathf.Sin (Time.time * 5);
}

function Update () {
	
	if (Time.time > spawnTime + lifeTime) {
		Spawner.Destroy (gameObject);
	}
	
	if (targetObject) {
		var targetPos : Vector3 = targetObject.transform.position;
		targetPos += transform.right * (Mathf.PingPong (Time.time, 1.0f) - 0.5f) * noise;
		var targetDir : Vector3 = (targetPos - tr.position);		var targetDist : float = targetDir.magnitude;
		targetDir /= targetDist;
		if (Time.time - spawnTime < lifeTime * 0.2 && targetDist > 3)
			targetDir += transform.right * 0.5 * sideBias;
		
		dir = Vector3.Slerp (dir, targetDir, Time.deltaTime * seekPrecision);
	
		tr.rotation = Quaternion.LookRotation(dir); 	
		tr.position += (dir * speed) * Time.deltaTime;
	}
	
	// Check if this one hits something
	var hits : Collider[] = Physics.OverlapSphere (tr.position, radius, ~ignoreLayers.value);
	var collided : boolean = false;
	for (var c : Collider in hits) {
		if(c.gameObject.name == "Player")
		{
			// Don't collide with triggers
			if (c.isTrigger)
			{
				continue;
			}
			var targetHealth : Health = c.GetComponent.<Health> ();
			if (targetHealth) {
				// Apply damage
				targetHealth.OnDamage (damageAmount, -tr.forward);
			}
			/*
			// Get the rigidbody if any
			if (c.rigidbody) {
				// Apply force to the target object
				var force : Vector3 = tr.forward * forceAmount;
				force.y = 0;
				c.rigidbody.AddForce (force, ForceMode.Impulse);
			}
			*/
			collided = true;
		}
	}
	if (collided) {
		Spawner.Destroy (gameObject);
		Spawner.Spawn (explosionPrefab, transform.position, transform.rotation);
	}
}
