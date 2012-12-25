using UnityEngine;
using System.Collections;

public class JewelsBuyButton : MonoBehaviour {
	private MagicsPrices magicsPrices;
	public GameObject jewelsPriceLabelGO;
	public GameObject jewelsHUDNumberGO;
	private UILabel jewelsPriceLabel;
	private UILabel jewelsHUDNumber;
	public string magicName;
	public GameObject MagicsPricesComponent;
	private Globals globals;
	private int magicJewelsPrice;
	
	public GameObject notEnoughFundsPopup;
	public GameObject EquipButton;
	public GameObject CoinsBuyButton;
	public GameObject UpgradeButton;
	
	void Awake()
	{
		globals = Globals.GetInstance();
		magicsPrices = MagicsPricesComponent.GetComponent<MagicsPrices>();
		//magicsPrices = new MagicsPrices();
	}
	
	void Start()
	{	
		jewelsPriceLabel = jewelsPriceLabelGO.GetComponent<UILabel>();
		jewelsHUDNumber = jewelsHUDNumberGO.GetComponent<UILabel>();
		
		magicJewelsPrice = magicsPrices.GetMagicJewelsPrice(magicName);
		jewelsPriceLabel.text = magicJewelsPrice + "";	
	}
	
	void OnClick()
	{
		if(globals.jewels >= magicJewelsPrice)
		{
			globals.jewels -= magicJewelsPrice;
			PlayerPrefs.SetInt("jewels", globals.jewels);
			jewelsHUDNumber.text = globals.jewels + "";
			PlayerPrefs.SetString(magicName+"MagicState", "Bought");
			
			EquipButton.SetActiveRecursively(true);
			UpgradeButton.SetActiveRecursively(true);
			CoinsBuyButton.SetActiveRecursively(false);
			this.gameObject.SetActiveRecursively(false);
		}
		else
		{
			notEnoughFundsPopup.SetActiveRecursively(true);	
		}
	}

}
