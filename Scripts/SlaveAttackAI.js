#pragma strict

// Public member data
public var behaviourOnSpotted : MonoBehaviour[];

// Private memeber data
private var character : Transform;
private var player : Transform;
private var playerHealth : Health;
private var mode : String;

private var globals : Globals;
private var firingRayCast : PerFrameRaycast;
private var firingHitInfo : RaycastHit;

function Awake () {
	globals = Globals.GetInstance();
	firingRayCast = GetComponent.<PerFrameRaycast>();
	character = transform;

}

function Update()
{
	
	if (CanSeeEnemy()) {
		OnSpotted ();
	}
}

function OnSpotted () {
	if (!behaviourOnSpotted[0].enabled) {
		behaviourOnSpotted[0].enabled = true;
	}
}


function CanSeeEnemy() : boolean {
	
	firingHitInfo = firingRayCast.GetHitInfo();
	
	if(firingHitInfo.transform.tag == "Enemy")
	{
		if(firingHitInfo.transform.gameObject.GetComponent.<Health>().health > 0 && firingHitInfo.transform.gameObject.GetComponent.<Health>().dead == false)
		{
			//transform.parent.transform.LookAt(firingHitInfo.transform);
			return true;
		}
	}
	return false;
}
