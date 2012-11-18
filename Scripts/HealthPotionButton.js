#pragma strict
private var player : GameObject;
private var playerHealthObj : Health;
private var healthPotionsNumber : int;
private var globals : Globals;
//public var healthPotionsLabel : UILabel;
function Awake()
{
	globals = Globals.GetInstance();
	
	healthPotionsNumber = globals.healthPotionsNumber;
	
	player = GameObject.FindWithTag("Player");
	playerHealthObj = player.GetComponent.<Health>();
}

function OnClick()
{
	if(healthPotionsNumber > 0)
	{
		globals.healthPotionsNumber -= 1;
		PlayerPrefs.SetInt("healthPotionsNumber", globals.healthPotionsNumber);
		playerHealthObj.health = playerHealthObj.maxHealth;
	}
	
	
}