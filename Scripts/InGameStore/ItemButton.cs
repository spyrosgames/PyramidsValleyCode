using UnityEngine;
using System.Collections;

public class ItemButton : MonoBehaviour {
	public string itemName;
	
	public GameObject itemNumberGO; //to access the item owned number
	public GameObject itemPriceGO; //to access the item price
	public GameObject itemPriceIconGO; //to access the item price icon either jewel or coin
	
	public GameObject UIRootGO; //to Access ItemsPrices script
	
	private Globals globals;
	
	private ItemsPrices itemsPrices;
	
	private UILabel itemNumberLabel;
	private UILabel itemPriceLabel;
	private UISlicedSprite itemPriceIcon;
	private string itemNameToFetch;
	private int itemsNumber; //number of items owned from this potion
	private int itemPrice;
	
	public GameObject NotEnoughFundsPopup;
	
	void Awake()
	{
		globals = Globals.GetInstance();
		itemsPrices = 	UIRootGO.GetComponent<ItemsPrices>();
		
		itemNumberLabel = itemNumberGO.GetComponent<UILabel>();
		itemPriceLabel = itemPriceGO.GetComponent<UILabel>();
		itemPriceIcon = itemPriceIconGO.GetComponent<UISlicedSprite>();
		
	}
	
	// Use this for initialization
	void Start () {

		
		itemNameToFetch = itemName + "PotionsNumber";
		
		itemsNumber = PlayerPrefs.GetInt(itemNameToFetch);
		itemNumberLabel.text = itemsNumber + "";
		
		itemPrice = itemsPrices.GetItemPrice(itemName);
		itemPriceLabel.text = itemPrice + "";
		
		//Set the price icon either jewel or coin
		if(itemsPrices.GetItemPriceType(itemName) == "C")
		{
			itemPriceIcon.spriteName = "Coin";	
		}
		else if(itemsPrices.GetItemPriceType(itemName) == "J")
		{
			//TODO:Naming style should be fixed
			itemPriceIcon.spriteName = "jewel";
		}	
	}
	
	void OnClick()
	{
		if(globals.coins >= itemPrice)
		{
			globals.coins -= itemPrice;
			PlayerPrefs.SetInt("coins", globals.coins);
			//Update the UILabel of coins in HUD
			
			
			itemsNumber++;
			PlayerPrefs.SetInt(itemNameToFetch, itemsNumber);
			//Update the UILabel of item number on the item itself
			itemNumberLabel.text = itemsNumber + "";
		}
		else
		{
			NotEnoughFundsPopup.SetActiveRecursively(true);	
		}
	}
}
