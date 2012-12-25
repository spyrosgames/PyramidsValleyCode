#pragma strict
class SlaveHitFlashing extends Health
{
	public var slaveMesh : GameObject;
	public var redSlaveMaterial : Material;
	public var normalSlaveMaterial : Material;

	function OnHit()
	{
		yield WaitForSeconds(0.4);
		//iTween.ColorTo(enemyMesh, {"r": 2, "time": 0.3});
		slaveMesh.transform.renderer.sharedMaterial = redSlaveMaterial;
		yield WaitForSeconds(0.4);
		slaveMesh.transform.renderer.sharedMaterial = normalSlaveMaterial;
	}
}