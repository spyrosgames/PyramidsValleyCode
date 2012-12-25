#pragma strict
public var ManaBar : GUITexture;
private var globals : Globals;
private var mana : float;
private var manaMaximum : float;

function Awake()
{
	globals = Globals.GetInstance();
	manaMaximum = globals.manaMaximum;
	if(manaMaximum == 0)
	{
		manaMaximum = 100;
		globals.manaMaximum = manaMaximum;
		PlayerPrefs.SetFloat("manaMaximum", 100);
	}
	Debug.Log("manaMaximum " + manaMaximum);
	globals.mana = manaMaximum;
}

function Start () {

}

function Update () {
	mana = globals.mana;
	manaMaximum = globals.manaMaximum;
	
	ManaBar.pixelInset.width = mana / (manaMaximum / 100);
}