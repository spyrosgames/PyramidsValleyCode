using UnityEngine;
using System.Collections;

public class UpgradeButton : MonoBehaviour {
	public GameObject upgradedLabel;
	
	public GameObject upgradeCoinsAmountGO;
	private UILabel upgradeCoinsAmountLabel;
	
	public GameObject coinsHUDGO;
	private UILabel coinsHUDLabel;
	
	private int magicUpgradeLevel;
	public string magicName;
	
	public GameObject[] upgradeLevelsTextures;
	
	private Globals globals;
	
	private int magicBaseUpgradePrice;
	private MagicsPrices magicsPrices;
	
	public GameObject notEnoughFundsPopup;
	
	public GameObject MagicsPriceGO;
	
	void Awake()
	{
		globals = Globals.GetInstance();
		magicsPrices = MagicsPriceGO.GetComponent<MagicsPrices>();
		
		magicUpgradeLevel = PlayerPrefs.GetInt(magicName+"UpgradeLevel");
		
		upgradeCoinsAmountLabel = upgradeCoinsAmountGO.GetComponent<UILabel>();
		coinsHUDLabel = coinsHUDGO.GetComponent<UILabel>();
		
		magicBaseUpgradePrice = magicsPrices.GetMagicBaseUpgradePrice(magicName);
		
	}
	
	void OnClick()
	{
		if(magicUpgradeLevel == 0)
		{			
			if(globals.coins >= magicBaseUpgradePrice)
			{
				globals.coins -= magicBaseUpgradePrice;
				PlayerPrefs.SetInt("coins", globals.coins);
				coinsHUDLabel.text = globals.coins + "";
				
				magicUpgradeLevel = 1;
				PlayerPrefs.SetInt(magicName+"UpgradeLevel", 1);
				upgradeLevelsTextures[0].active = true;
				upgradeCoinsAmountLabel.text = magicBaseUpgradePrice * 2 + "";
			}
			else
			{
				notEnoughFundsPopup.SetActiveRecursively(true);
			}
		}
		else if(magicUpgradeLevel == 1)
		{			
			if(globals.coins >= magicBaseUpgradePrice * 2)
			{
				globals.coins -= (magicBaseUpgradePrice * 2);
				PlayerPrefs.SetInt("coins", globals.coins);
				coinsHUDLabel.text = globals.coins + "";
			
				magicUpgradeLevel = 2;
				PlayerPrefs.SetInt(magicName+"UpgradeLevel", 2);
				upgradeLevelsTextures[1].active = true;
				upgradeCoinsAmountLabel.text = magicBaseUpgradePrice * 4 + "";
			}
			else
			{
				notEnoughFundsPopup.SetActiveRecursively(true);
			}
		}
		else if(magicUpgradeLevel == 2)
		{
			if(globals.coins >= magicBaseUpgradePrice * 4)
			{
				globals.coins -= (magicBaseUpgradePrice * 4);
				PlayerPrefs.SetInt("coins", globals.coins);
				coinsHUDLabel.text = globals.coins + "";
				
				magicUpgradeLevel = 3;
				PlayerPrefs.SetInt(magicName+"UpgradeLevel", 3);
				upgradeLevelsTextures[2].active = true;
				upgradeCoinsAmountLabel.text = magicBaseUpgradePrice * 8 + "";
			}
			else
			{
				notEnoughFundsPopup.SetActiveRecursively(true);	
			}
			
		}
		else if(magicUpgradeLevel == 3)
		{			
			
			if(globals.coins >= magicBaseUpgradePrice * 8)
			{
				globals.coins -= (magicBaseUpgradePrice * 8);
				PlayerPrefs.SetInt("coins", globals.coins);
				coinsHUDLabel.text = globals.coins + "";
				
				magicUpgradeLevel = 4;
				PlayerPrefs.SetInt(magicName+"UpgradeLevel", 4);
				upgradeLevelsTextures[3].active = true;
				
				upgradedLabel.SetActiveRecursively(true);
				this.gameObject.SetActiveRecursively(false);
			}
			else
			{
				notEnoughFundsPopup.SetActiveRecursively(true);	
			}
		}
	}
}
