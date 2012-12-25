#pragma strict

private var hitInfo : RaycastHit;
public var AIComponent : Transform;
public var WeaponSlotDirectionComponent : Transform;

function Awake () {
	
}

function Update () {
	// Cast a ray to find out the end point of the laser
	hitInfo = RaycastHit ();
	Physics.Raycast (WeaponSlotDirectionComponent.position, WeaponSlotDirectionComponent.forward, hitInfo);
	Debug.DrawRay(WeaponSlotDirectionComponent.position, WeaponSlotDirectionComponent.forward, Color.blue);
}

function GetHitInfo () : RaycastHit {
	return hitInfo;
}
