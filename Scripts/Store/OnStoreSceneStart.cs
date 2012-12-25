using UnityEngine;
using System.Collections;

public class OnStoreSceneStart : MonoBehaviour {
	private MagicsPrices magicsPricesObj;
	public GameObject coinsHUDGO;
	public GameObject jewelsHUDGO;
	
	private UILabel coinsHUDLabel;
	private UILabel jewelsHUDLabel;
	
	private Globals globals;
	
	void Awake()
	{
		globals = Globals.GetInstance();
		
		//PlayerPrefs.DeleteAll();
		//ToBeRemoved
		if(globals.coins == 0)
		{
			globals.coins = 9999999;
			PlayerPrefs.SetInt("coins", 1000000);
		}
		if(globals.jewels == 0)
		{
			globals.jewels = 9999999;
			PlayerPrefs.SetInt("jewels", 1000000);
		}
		//
		
		
		
		magicsPricesObj = GetComponent<MagicsPrices>();
		
		coinsHUDLabel = coinsHUDGO.GetComponent<UILabel>();
		coinsHUDLabel.text = globals.coins + "";
		
		jewelsHUDLabel = jewelsHUDGO.GetComponent<UILabel>();
		jewelsHUDLabel.text = globals.jewels + "";
		
		magicsPricesObj.AddMagicCoinsPrice("Tornado", 200);
		magicsPricesObj.AddMagicJewelsPrice("Tornado", 20);
		magicsPricesObj.AddMagicBaseUpgradePrice("Tornado", 200);
		
		magicsPricesObj.AddMagicCoinsPrice("LightningStrike", 200);
		magicsPricesObj.AddMagicJewelsPrice("LightningStrike", 20);
		magicsPricesObj.AddMagicBaseUpgradePrice("LightningStrike", 200);
		
		magicsPricesObj.AddMagicCoinsPrice("DustStorm", 200);
		magicsPricesObj.AddMagicJewelsPrice("DustStorm", 20);
		magicsPricesObj.AddMagicBaseUpgradePrice("DustStorm", 200);
		
		magicsPricesObj.AddMagicCoinsPrice("FingerStun", 200);
		magicsPricesObj.AddMagicJewelsPrice("FingerStun", 20);
		magicsPricesObj.AddMagicBaseUpgradePrice("FingerStun", 200);
		
		magicsPricesObj.AddMagicCoinsPrice("Stun", 500);
		magicsPricesObj.AddMagicJewelsPrice("Stun", 50);
		magicsPricesObj.AddMagicBaseUpgradePrice("Stun", 600);
		
		magicsPricesObj.AddMagicCoinsPrice("Fire", 900);
		magicsPricesObj.AddMagicJewelsPrice("Fire", 90);
		magicsPricesObj.AddMagicBaseUpgradePrice("Fire", 1000);
		
		magicsPricesObj.AddMagicCoinsPrice("HolyFire", 2500);
		magicsPricesObj.AddMagicJewelsPrice("HolyFire", 250);
		magicsPricesObj.AddMagicBaseUpgradePrice("HolyFire", 3000);
		
		magicsPricesObj.AddMagicCoinsPrice("StaticCharge", 2500);
		magicsPricesObj.AddMagicJewelsPrice("StaticCharge", 250);
		magicsPricesObj.AddMagicBaseUpgradePrice("StaticCharge", 3000);
		
		magicsPricesObj.AddMagicCoinsPrice("Starfall", 3000);
		magicsPricesObj.AddMagicJewelsPrice("Starfall", 300);
		magicsPricesObj.AddMagicBaseUpgradePrice("Starfall", 3600);
		
		magicsPricesObj.AddMagicCoinsPrice("Magma", 7500);
		magicsPricesObj.AddMagicJewelsPrice("Magma", 750);
		magicsPricesObj.AddMagicBaseUpgradePrice("Magma", 9000);
		
		magicsPricesObj.AddMagicCoinsPrice("IceFall", 10000);
		magicsPricesObj.AddMagicJewelsPrice("IceFall", 1000);
		magicsPricesObj.AddMagicBaseUpgradePrice("IceFall", 12000);
		
		magicsPricesObj.AddMagicCoinsPrice("Whirl", 10000);
		magicsPricesObj.AddMagicJewelsPrice("Whirl", 1000);
		magicsPricesObj.AddMagicBaseUpgradePrice("Whirl", 12000);
		
		magicsPricesObj.AddMagicCoinsPrice("IceStun", 12000);
		magicsPricesObj.AddMagicJewelsPrice("IceStun", 1200);
		magicsPricesObj.AddMagicBaseUpgradePrice("IceStun", 15000);
		
		magicsPricesObj.AddMagicCoinsPrice("LightningBall", 15000);
		magicsPricesObj.AddMagicJewelsPrice("LightningBall", 1500);
		magicsPricesObj.AddMagicBaseUpgradePrice("LightningBall", 20000);
		
		magicsPricesObj.AddMagicCoinsPrice("LightningBolt", 15000);
		magicsPricesObj.AddMagicJewelsPrice("LightningBolt", 1500);
		magicsPricesObj.AddMagicBaseUpgradePrice("LightningBolt", 20000);
		
		magicsPricesObj.AddMagicCoinsPrice("Slave", 15000);
		magicsPricesObj.AddMagicJewelsPrice("Slave", 1500);
		magicsPricesObj.AddMagicBaseUpgradePrice("Slave", 20000);
		
		magicsPricesObj.AddMagicCoinsPrice("Shake", 25000);
		magicsPricesObj.AddMagicJewelsPrice("Shake", 2500);
		magicsPricesObj.AddMagicBaseUpgradePrice("Shake", 26000);
		
		magicsPricesObj.AddMagicCoinsPrice("Berserk", 25000);
		magicsPricesObj.AddMagicJewelsPrice("Berserk", 2500);
		magicsPricesObj.AddMagicBaseUpgradePrice("Berserk", 26000);
	}
	
}
