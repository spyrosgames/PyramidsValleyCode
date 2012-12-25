using UnityEngine;
using System.Collections;

public class CoinsBuyButton : MonoBehaviour {
	private MagicsPrices magicsPrices;
	public GameObject coinsPriceLabelGO;
	public GameObject coinsHUDNumberGO;
	private UILabel coinsPriceLabel;
	private UILabel coinsHUDNumber;
	public string magicName;
	public GameObject MagicsPricesComponent;
	private Globals globals;
	private int magicCoinsPrice;
	
	public GameObject notEnoughFundsPopup;
	public GameObject EquipButton;
	public GameObject JewelsBuyButton;
	public GameObject UpgradeButton;
	
	void Awake()
	{
		globals = Globals.GetInstance();
		magicsPrices = MagicsPricesComponent.GetComponent<MagicsPrices>();
		//magicsPrices = new MagicsPrices();
	}
	
	void Start()
	{	
		coinsPriceLabel = coinsPriceLabelGO.GetComponent<UILabel>();
		coinsHUDNumber = coinsHUDNumberGO.GetComponent<UILabel>();
		
		magicCoinsPrice = magicsPrices.GetMagicCoinsPrice(magicName);
		coinsPriceLabel.text = magicCoinsPrice + "";	
	}
	
	void OnClick()
	{
		if(globals.coins >= magicCoinsPrice)
		{
			globals.coins -= magicCoinsPrice;
			PlayerPrefs.SetInt("coins", globals.coins);
			coinsHUDNumber.text = globals.coins + "";
			PlayerPrefs.SetString(magicName+"MagicState", "Bought");
			
			EquipButton.SetActiveRecursively(true);
			UpgradeButton.SetActiveRecursively(true);
			JewelsBuyButton.SetActiveRecursively(false);
			this.gameObject.SetActiveRecursively(false);
		}
		else
		{
			notEnoughFundsPopup.SetActiveRecursively(true);	
		}
	}

}
