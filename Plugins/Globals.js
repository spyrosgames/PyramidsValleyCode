class Globals
{
	public var enemiesKilled : int;
	public var callInstantiate : boolean;
	
	//XP
	public var XPPoints : float;
	public var XPMaximum : float;
	
	//MANA
	public var mana : float;
	public var manaMaximum : float;
	public var manaRegenerationSpeed : float;
	
	//MagicCoolDown
	public var magicCoolDown : float;
	
	//Player
	public var playerMaxHealth : float;
	public var playerBulletDamage : float;
	public var playerWalkingSpeed : float;
	public var playerShootingFrequency : float;
	public var playerHealthRegenerationSpeed : float;
	
	//Slave
	public var slaveMaxHealth : float;
	public var slaveDamage : float;
	public var slaveAIStoppingDistance : float;
	public var slaveWalkingSpeed : float;
	public var slaveShootingFrequency : float;
	
	//MeleeEnemy
	public var meleeEnemyMaxHealth : float;
	public var meleeEnemyDamage : float;
	public var meleeEnemyAIStoppingDistance : float;

	//RangedEnemy
	public var rangedEnemyMaxHealth : float;
	public var rangedEnemyDamage : float;
	public var rangedEnemyAIStoppingDistance : float;

	//Antagonist
	public var antagonistMaxHealth : float;
	public var antagonistDamage : float;
	public var antagonistAIStoppingDistance : float;

	//Potions
	public var healthPotionsNumber : int;
	public var manaPotionsNumber : int;
	
	//InGameStorePotions
	public var revivePotionsNumber : int;
	public var fiveHealthPotionsNumber : int;
	public var fiveManaPotionsNumber : int;
	public var autoHealPotionsNumber : int;
	public var extraLargeHealthPotionsNumber : int;
	public var extraLargeManaPotionsNumber : int;
	public var largeHealthPotionsNumber : int;
	public var largeManaPotionsNumber : int;
	public var mediumHealthPotionsNumber : int;
	public var mediumManaPotionsNumber : int;
	public var smallManaPotionsNumber : int;
	public var xpMultPotionsNumber : int;
	
	//Stun magic
	public var isEnemyStunned : boolean;
	
	
	public var level : int;
	public var coins : int;
	public var jewels : int;
	
	public var levelUpCoinsReward : int = 0;
	public var levelUpJewelsReward : int = 0;


	public var lives : int;

	public var numberOfCurrentEnemiesInstantiated : int;
	
	public var score : int;
	
	private static var Instance : Globals;

	protected function Globals()
	{
		enemiesKilled = 0;
		callInstantiate = true;
		lives = 3;
		
		//XP
		XPPoints = PlayerPrefs.GetFloat("XP");
		XPMaximum = PlayerPrefs.GetFloat("XPMaximum");
		
		//Mana
		manaMaximum = PlayerPrefs.GetFloat("manaMaximum");
		manaRegenerationSpeed = PlayerPrefs.GetFloat("manaRegenerationSpeed");
		
		//CoolDown
		magicCoolDown = PlayerPrefs.GetFloat("magicCoolDown");
		
		//Player
		playerMaxHealth = PlayerPrefs.GetFloat("playerMaxHealth");
		playerWalkingSpeed = PlayerPrefs.GetFloat("playerWalkingSpeed");
		playerBulletDamage = PlayerPrefs.GetFloat("playerBulletDamage");
		playerShootingFrequency = PlayerPrefs.GetFloat("playerShootingFrequency");
		playerHealthRegenerationSpeed = PlayerPrefs.GetFloat("playerHealthRegenerationSpeed");

		//Slave
		slaveMaxHealth = PlayerPrefs.GetFloat("slaveMaxHealth");
		slaveWalkingSpeed = PlayerPrefs.GetFloat("slaveWalkingSpeed");
		slaveDamage = PlayerPrefs.GetFloat("slaveDamage");
		slaveShootingFrequency = PlayerPrefs.GetFloat("slaveShootingFrequency");
		slaveAIStoppingDistance = 3;
	
		//MeleeEnemy
		meleeEnemyMaxHealth = 20;
		meleeEnemyDamage = 1;
		meleeEnemyAIStoppingDistance = 3.8;

		//RangedEnemy
		rangedEnemyMaxHealth = 20;
		rangedEnemyDamage = 5;
		rangedEnemyAIStoppingDistance = 13;
		
		//Antagonist
		antagonistMaxHealth = 200;
		antagonistDamage = 20;
		antagonistAIStoppingDistance = 15;
	
		//Potions
		healthPotionsNumber = PlayerPrefs.GetInt("healthPotionsNumber");
		manaPotionsNumber = PlayerPrefs.GetInt("manaPotionsNumber");
		
		
		//InGameStorePotions
		revivePotionsNumber = PlayerPrefs.GetInt("revivePotionsNumber");
		fiveHealthPotionsNumber = PlayerPrefs.GetInt("fiveHealthPotionsNumber");
		fiveManaPotionsNumber = PlayerPrefs.GetInt("fiveManaPotionsNumber");
		autoHealPotionsNumber = PlayerPrefs.GetInt("autoHealPotionsNumber");
		extraLargeHealthPotionsNumber = PlayerPrefs.GetInt("extraLargeHealthPotionsNumber");
		extraLargeManaPotionsNumber = PlayerPrefs.GetInt("extraLargeManaPotionsNumber");
		largeHealthPotionsNumber = PlayerPrefs.GetInt("largeHealthPotionsNumber");
		largeManaPotionsNumber = PlayerPrefs.GetInt("largeManaPotionsNumber");
		mediumHealthPotionsNumber = PlayerPrefs.GetInt("mediumHealthPotionsNumber");
		mediumManaPotionsNumber = PlayerPrefs.GetInt("mediumManaPotionsNumber");
		smallManaPotionsNumber = PlayerPrefs.GetInt("smallManaPotionsNumber");
		xpMultPotionsNumber = PlayerPrefs.GetInt("xpMultPotionsNumber");
		
		//Stun Magic
		isEnemyStunned = false;
		
		//Coins
		coins = PlayerPrefs.GetInt("coins");
		
		//Jewels
		jewels = PlayerPrefs.GetInt("jewels");
		
		//Level
		level = PlayerPrefs.GetInt("Level");
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