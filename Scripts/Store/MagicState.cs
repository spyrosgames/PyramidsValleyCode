using UnityEngine;
using System.Collections;

public class MagicState : MonoBehaviour {
	public string magicName;
	
	public GameObject buyWithCoinsButton;
	public GameObject buyWithJewelsButton;
	
	public GameObject equipButton;
	public GameObject equippedLabel;
	
	public GameObject upgradeButton;
	public GameObject upgradedLabel;
	
	private string magicState;
	private int magicUpgradeLevel;
	
	public GameObject[] upgradeLevelsTextures;
	
	public GameObject MagicsPricesGO;
	private MagicsPrices magicsPrices;
	
	public GameObject upgradeButtonPriceGO;
	private UILabel upgradeButtonPriceLabel;
	
	void Awake()
	{
		upgradeButtonPriceLabel = upgradeButtonPriceGO.GetComponent<UILabel>();
		
		magicState = PlayerPrefs.GetString(magicName+"MagicState");
		magicUpgradeLevel = PlayerPrefs.GetInt(magicName+"UpgradeLevel");
		
		Debug.Log("magicState" + magicState + ", " + "magicUpgradeLevel" + magicUpgradeLevel);

		if(magicState != "Bought" && magicState != "Equipped")
		{
			
			
			buyWithCoinsButton.SetActiveRecursively(true);
			buyWithJewelsButton.SetActiveRecursively(true);
			
			equipButton.SetActiveRecursively(false);
			equippedLabel.SetActiveRecursively(false);
			
			upgradeButton.SetActiveRecursively(false);
			upgradedLabel.SetActiveRecursively(false);
		}
		else if(magicState == "Bought" && magicUpgradeLevel != 4)
		{
			buyWithCoinsButton.SetActiveRecursively(false);
			buyWithJewelsButton.SetActiveRecursively(false);
			
			equipButton.SetActiveRecursively(true);
			equippedLabel.SetActiveRecursively(false);
			
			upgradeButton.SetActiveRecursively(true);
			upgradedLabel.SetActiveRecursively(false);
			
			if(magicUpgradeLevel == 0)
			{
				upgradeButtonPriceLabel.text = magicsPrices.GetMagicBaseUpgradePrice(magicName) + "";	
			}
		}
		else if(magicState == "Equipped" && magicUpgradeLevel != 4)
		{
			buyWithCoinsButton.SetActiveRecursively(false);
			buyWithJewelsButton.SetActiveRecursively(false);
			
			equipButton.SetActiveRecursively(false);
			equippedLabel.SetActiveRecursively(true);
			
			upgradeButton.SetActiveRecursively(true);
			upgradedLabel.SetActiveRecursively(false);
			
			if(magicUpgradeLevel == 0)
			{
				upgradeButtonPriceLabel.text = magicsPrices.GetMagicBaseUpgradePrice(magicName) + "";	
			}
		}
		else if(magicState == "Bought" && magicUpgradeLevel == 4)
		{
			buyWithCoinsButton.SetActiveRecursively(false);
			buyWithJewelsButton.SetActiveRecursively(false);
			
			equipButton.SetActiveRecursively(true);
			equippedLabel.SetActiveRecursively(false);
			
			upgradeButton.SetActiveRecursively(false);
			upgradedLabel.SetActiveRecursively(true);	
		}
		else if(magicState == "Equipped" && magicUpgradeLevel == 4)
		{
			buyWithCoinsButton.SetActiveRecursively(false);
			buyWithJewelsButton.SetActiveRecursively(false);
			
			equipButton.SetActiveRecursively(false);
			equippedLabel.SetActiveRecursively(true);
			
			upgradeButton.SetActiveRecursively(false);
			upgradedLabel.SetActiveRecursively(true);	
		}
		
		if(magicUpgradeLevel == 0)
		{
			for(int i = 0; i < upgradeLevelsTextures.Length; i++)
			{
				upgradeLevelsTextures[i].active = false;
			}
		}
		else if(magicUpgradeLevel == 1)
		{
			upgradeLevelsTextures[0].active = true;
			upgradeButtonPriceLabel.text = (magicsPrices.GetMagicBaseUpgradePrice(magicName) * 2) + "";
		}
		else if(magicUpgradeLevel == 2)
		{
			upgradeLevelsTextures[0].active = true;
			upgradeLevelsTextures[1].active = true;
			upgradeButtonPriceLabel.text = (magicsPrices.GetMagicBaseUpgradePrice(magicName) * 4) + "";

		}
		else if(magicUpgradeLevel == 3)
		{
			upgradeLevelsTextures[0].active = true;
			upgradeLevelsTextures[1].active = true;	
			upgradeLevelsTextures[2].active = true;
			upgradeButtonPriceLabel.text = (magicsPrices.GetMagicBaseUpgradePrice(magicName) * 8) + "";
		}
		else if(magicUpgradeLevel == 4)
		{
			upgradeLevelsTextures[0].active = true;
			upgradeLevelsTextures[1].active = true;	
			upgradeLevelsTextures[2].active = true;
			upgradeLevelsTextures[3].active = true;
		}
	}
	
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
