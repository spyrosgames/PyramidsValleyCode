#pragma strict

// Public member data
public var behaviourOnSpotted : MonoBehaviour[];
//public var soundOnSpotted : AudioClip;
//public var behaviourOnLostTrack : MonoBehaviour;

// Private memeber data
private var character : Transform;
private var player : Transform;
private var raaFighter : Transform;
private var playerHealth : Health;
private var mode : String;

private var globals : Globals;

function Awake () {
	globals = Globals.GetInstance();
	
	character = transform;
	player = GameObject.FindWithTag ("Player").transform;
	playerHealth = player.GetComponent.<Health>();
	if(this.gameObject.name == "MeleeEnemy")
	{
		mode = "Melee";
	}
	else if(this.gameObject.name == "RangedEnemy")
	{
		mode = "Ranged";
	}
}

/*
function OnEnable () {
	behaviourOnSpotted[0].enabled = false;
	behaviourOnSpotted[1].enabled = false;
}
*/

function Update()
{
	if (CanSeePlayer()) {
		OnSpotted ();
	}
}

function OnSpotted () {
	if(mode == "Ranged")
	{
		if (!behaviourOnSpotted[0].enabled) {
			behaviourOnSpotted[0].enabled = true;
		}
		behaviourOnSpotted[1].enabled = false;
	}
	else if(mode == "Melee")
	{
		if (!behaviourOnSpotted[1].enabled) {
			behaviourOnSpotted[1].enabled = true;
		}	
		behaviourOnSpotted[0].enabled = false;
	}

	/*
	if (audio && soundOnSpotted) {
		audio.clip = soundOnSpotted;
		if(playerHealth.health != 0)
		{
			audio.Play ();
		}
	}
	*/
}


function CanSeePlayer () : boolean {
	var playerDirection : Vector3 = (player.position - character.position);
	var hit : RaycastHit;
	
	Physics.Raycast (character.position, playerDirection, hit, playerDirection.magnitude);

	if (hit.collider && hit.collider.transform == player && hit.distance <= globals.rangedEnemyAIStoppingDistance) {   //We choose the hit.distance <= maximum of the ranged and melee stopping distances
		return true;
	}
	return false;
}
