#pragma strict
public var meleeEnemyMesh : GameObject;
public var rangedEnemyMesh : GameObject;

public var meleeWalkAnimation : AnimationClip;
public var meleeIdleAnimation : AnimationClip;

public var rangedWalkAnimation : AnimationClip;
public var rangedIdleAnimation : AnimationClip;
public var rangedShootAnimation : AnimationClip;

function Awake()
{
	if(this.gameObject.name == "MeleeEnemy")
	{
		meleeEnemyMesh.animation[meleeWalkAnimation.name].layer = 1;
		meleeEnemyMesh.animation[meleeIdleAnimation.name].layer = 1;
		
		meleeEnemyMesh.animation.SyncLayer(1);
	}
	if(this.gameObject.name == "RangedEnemy")
	{
		rangedEnemyMesh.animation[rangedWalkAnimation.name].layer = 2;
		rangedEnemyMesh.animation[rangedIdleAnimation.name].layer = 2;
		
		rangedEnemyMesh.animation.SyncLayer(2);
	}
}