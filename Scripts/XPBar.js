#pragma strict
public var XPBar : GUITexture;
private var globals : Globals;
private var XPMaximum : int;
private var manaMaximum : int;
public var LevelUpText : GUIText;
private var player : GameObject;


function Awake()
{
	globals = Globals.GetInstance();

	XPMaximum = globals.XPMaximum;
	if(XPMaximum == 0)
	{
		globals.XPPoints = 0;
		PlayerPrefs.SetInt("XP", 0);
		XPMaximum = 100;
		globals.XPMaximum = 100;
		PlayerPrefs.SetInt("XPMaximum", 100);
		Debug.Log("This is the first time XP bar is used.");
	}
	XPBar.pixelInset.width = globals.XPPoints / (globals.XPMaximum / 100);
	
	player = GameObject.FindWithTag("Player");
}

function OnDamageSignal()
{
	
	if(globals.XPPoints == XPMaximum)
	{
		XPMaximum += 10;
		globals.XPMaximum = globals.XPMaximum + 10;
		PlayerPrefs.SetInt("XPMaximum", XPMaximum);
		
		globals.XPPoints = 0;
		PlayerPrefs.SetInt("XP", 0);
		
		globals.manaMaximum = globals.manaMaximum + 10;
		PlayerPrefs.SetFloat("manaMaximum", globals.manaMaximum);
		
		globals.playerMaxHealth = globals.playerMaxHealth + 10;
		PlayerPrefs.SetFloat("playerMaxHealth", globals.playerMaxHealth); 
		player.GetComponent.<Health>().maxHealth = globals.playerMaxHealth;
		player.GetComponent.<Health>().health = globals.playerMaxHealth;
      
		globals.level += 1;
		PlayerPrefs.SetInt("Level", globals.level);
		
		LevelUpText.text = "Level Up!";
		//iTween LevelUp Animation goes here
		Debug.Log("XPMaximum = " + XPMaximum + ", manaMaximum = " + manaMaximum);
		AnimateLevelUp();
	}
	Debug.Log("OnDamageSignal XP : " + globals.XPPoints + " XPMaximum" + XPMaximum);
	
	XPBar.pixelInset.width = globals.XPPoints / (globals.XPMaximum / 100);
}

function AnimateLevelUp()
{
	Debug.Log("Level Up");
	iTween.ValueTo(gameObject, iTween.Hash("from", Vector2(-40, 150), "to", Vector2(70,150),"time",7.0,"onUpdate", "AnimateGUITextPixelOffset", "easeType", iTween.EaseType.easeOutElastic));
	iTween.ValueTo(gameObject, iTween.Hash("from", Vector2(70, 150), "to", Vector2(600,150),"time",7.0,"delay",4.0,"onUpdate", "AnimateGUITextPixelOffset", "easeType", iTween.EaseType.easeOutElastic));
}

function AnimateGUITextPixelOffset(pixelOffset : Vector2){
    LevelUpText.pixelOffset = pixelOffset;
}