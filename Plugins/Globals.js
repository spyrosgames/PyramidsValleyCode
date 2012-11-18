class Globals
{
	public var enemiesKilled : int;
	public var callInstantiate : boolean;
	public var XPPoints : float;
	public var XPMaximum : float;
	public var mana : float;
	public var manaMaximum : float;
	public var manaRegenerationSpeed : float;
	public var magicCoolDown : float;
	public var playerMaxHealth : float;
	public var meleeEnemyMaxHealth : float;
	public var rangedEnemyMaxHealth : float;
	public var meleeEnemyDamage : float;
	public var rangedEnemyDamage : float;
	public var playerBulletDamage : float;
	
	public var meleeEnemyAIStoppingDistance : float;
	public var rangedEnemyAIStoppingDistance : float;
	
	public var level : int;
	public var coins : int = 10;
	public var jewels : int = 10;
	
	public var healthPotionsNumber : int;
	public var manaPotionsNumber : int;
	
	public var playerWalkingSpeed : float;
	public var playerShootingFrequency : float;
	public var playerHealthRegenerationSpeed : float;
	
	public var levelUpCoinsReward : int = 0;
	public var levelUpJewelsReward : int = 0;
	public var numberOfIsisMagics : int = 2;
	public var numberOfSethMagics : int = 16;
	public var numberOfSekhmetMagics : int = 2;
	public var numberOfMontoMagics : int = 2;
	public var numberOfAmounMagics : int = 2;
	public var numberOfRaaMagics : int = 2;
	public var numberOfAnubisMagics : int = 2;

	public var anubisMagicActiveNumber : int = 0;

	public var lives : int;

	public var numberOfCurrentEnemiesInstantiated : int;
	
	public var score : int;
	
	private static var Instance : Globals;

	protected function Globals()
	{
		enemiesKilled = 0;
		callInstantiate = true;
		lives = 3;
		XPPoints = PlayerPrefs.GetFloat("XP");
		XPMaximum = PlayerPrefs.GetFloat("XPMaximum");
		manaMaximum = PlayerPrefs.GetFloat("manaMaximum");
		manaRegenerationSpeed = PlayerPrefs.GetFloat("manaRegenerationSpeed");
		magicCoolDown = PlayerPrefs.GetFloat("magicCoolDown");
		playerMaxHealth = PlayerPrefs.GetFloat("playerMaxHealth");
		
		meleeEnemyMaxHealth = 20;
		rangedEnemyMaxHealth = 20;
		
		meleeEnemyDamage = 1;
		rangedEnemyDamage = 5;
		
		playerWalkingSpeed = PlayerPrefs.GetFloat("playerWalkingSpeed");
		playerBulletDamage = PlayerPrefs.GetFloat("playerBulletDamage");
		playerShootingFrequency = PlayerPrefs.GetFloat("playerShootingFrequency");
		playerHealthRegenerationSpeed = PlayerPrefs.GetFloat("playerHealthRegenerationSpeed");
		healthPotionsNumber = PlayerPrefs.GetInt("healthPotionsNumber");
		manaPotionsNumber = PlayerPrefs.GetInt("manaPotionsNumber");
		
		level = PlayerPrefs.GetInt("Level");
		
		meleeEnemyAIStoppingDistance = 4;
		rangedEnemyAIStoppingDistance = 8;
		
	}
	
	public static function GetInstance() : Globals
	{
		if(Instance == null)
		{
			Instance = new Globals();
		}
		return Instance;
	}
}