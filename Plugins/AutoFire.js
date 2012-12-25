#pragma strict

@script RequireComponent (PerFrameRaycast)

var bulletPrefab : GameObject;
var spawnPoint : Transform;
var frequency : float = 10;
var coneAngle : float = 1.5;
var firing : boolean = false;
var damagePerSecond : float;
var forcePerSecond : float = 20.0;
var hitSoundVolume : float = 0.5;

var muzzleFlashFront : GameObject;

private var lastFireTime : float = -1;
private var raycast : PerFrameRaycast;

//var sound : AudioClip;
var shootingSound : AudioClip;
private var globals : Globals;

function Awake () {
	globals = Globals.GetInstance();
	//muzzleFlashFront.active = false;
	damagePerSecond = globals.playerBulletDamage;
	frequency = globals.playerShootingFrequency;
	/*
	if(damagePerSecond == 0)
	{
		damagePerSecond = 7.5;
		globals.playerBulletDamage = 7.5;
		PlayerPrefs.SetFloat("playerBulletDamage", damagePerSecond);
	}
	*/
	if(frequency == 0)
	{
		frequency = 3;
		globals.playerShootingFrequency = 3;
		PlayerPrefs.SetFloat("playerShootingFrequency", 3);
	}
	raycast = GetComponent.<PerFrameRaycast> ();
	if (spawnPoint == null)
		spawnPoint = transform;
}

function Update () {
	if (firing) {
		
		if (Time.time > lastFireTime + 1 / frequency) {
			audio.PlayOneShot(shootingSound);
			// Spawn visual bullet
			var coneRandomRotation = Quaternion.Euler (Random.Range (-coneAngle, coneAngle), Random.Range (-coneAngle, coneAngle), 0);
			var go : GameObject = Spawner.Spawn (bulletPrefab, spawnPoint.position, spawnPoint.rotation * coneRandomRotation) as GameObject;
			var bullet : SimpleBullet = go.GetComponent.<SimpleBullet> ();
			
			lastFireTime = Time.time;
			
			/*
			// Find the object hit by the raycast
			var hitInfo : RaycastHit = raycast.GetHitInfo ();
			if (hitInfo.transform && hitInfo.transform != null && hitInfo.transform.tag == "Enemy") {
				// Get the health component of the target if any
				var targetHealth : Health = hitInfo.transform.GetComponent.<Health> ();
				if (targetHealth && targetHealth.health > 0 && targetHealth.dead == false) {
					// Apply damage
					targetHealth.OnDamage (damagePerSecond / frequency, -spawnPoint.forward);
				}
				
				// Get the rigidbody if any
				if (hitInfo.rigidbody) {
					// Apply force to the target object at the position of the hit point
					var force : Vector3 = transform.forward * (forcePerSecond / frequency);
					hitInfo.rigidbody.AddForceAtPosition (force, hitInfo.point, ForceMode.Impulse);
				}
				
				// Ricochet sound
				//var sound : AudioClip = MaterialImpactManager.GetBulletHitSound (hitInfo.collider.sharedMaterial);
				//AudioSource.PlayClipAtPoint (sound, hitInfo.point, hitSoundVolume);
				//bullet.dist = hitInfo.distance;

				
				bullet.dist = hitInfo.distance + 4;
			}
			else {
				bullet.dist = 1000;
			}
			*/
		}
	}
}

function OnStartFire () {
	firing = true;
	
	muzzleFlashFront.active = true;
	
	//if (audio)
		//audio.Play ();
}

function OnStopFire () {
	firing = false;
	
	muzzleFlashFront.active = false;
	
	if (audio)
		audio.Stop ();
}