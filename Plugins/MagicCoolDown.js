#pragma strict
public var magicAttackTimer : float;
public var magicCoolDown : float;

public var magicCoolDownGUITexture : GUITexture;
public var coolDownTextures : Texture2D[];
private var magicsCoolDownTable : Hashtable;

public var highlightAnimationsSignals : SignalSender;
private var globals : Globals;

function Awake()
{
	magicsCoolDownTable = new Hashtable();
	globals = Globals.GetInstance();
}

function Start () {
	magicCoolDown = globals.magicCoolDown;
	if(magicCoolDown == 0)
	{
		magicCoolDown = 10;
		globals.magicCoolDown = 10;
		PlayerPrefs.SetFloat("magicCoolDown", magicCoolDown);
	}
}

function Update () {
	MagicCoolDownCheck();
}

function MagicCoolDownCheck()
{
	if(magicAttackTimer > 0)
	{
		magicAttackTimer -= Time.deltaTime;
	
		if(magicAttackTimer >=0 * magicCoolDown && magicAttackTimer < 0.0625 * magicCoolDown)
		{
			magicCoolDownGUITexture.texture = coolDownTextures[5];
			highlightAnimationsSignals.SendSignals(this);
		}
		
		if(magicAttackTimer > 0.0625 * magicCoolDown && magicAttackTimer < 0.125 * magicCoolDown)
		{
			magicCoolDownGUITexture.texture = coolDownTextures[4];
		}
		
		if(magicAttackTimer > 0.125 * magicCoolDown && magicAttackTimer < 0.25 * magicCoolDown)
		{
			magicCoolDownGUITexture.texture = coolDownTextures[3];
		}
		
		if(magicAttackTimer > 0.375 * magicCoolDown && magicAttackTimer < 0.5 * magicCoolDown)
		{
			magicCoolDownGUITexture.texture = coolDownTextures[2];
		}
		
		if(magicAttackTimer > 0.625 * magicCoolDown && magicAttackTimer < 0.75 * magicCoolDown)
		{
			magicCoolDownGUITexture.texture = coolDownTextures[1];
		}
		
		if(magicAttackTimer > 0.875 * magicCoolDown && magicAttackTimer < magicCoolDown)
		{
			magicCoolDownGUITexture.texture = coolDownTextures[0]; 
		}
	}
	if(magicAttackTimer < 0)
	{
		magicAttackTimer = 0;
	}
	if(magicAttackTimer == 0)
	{
		//magicCoolDownGUITexture.texture = null;
	}
}