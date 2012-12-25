using UnityEngine;
using System.Collections;

public class ItemsPrices : MonoBehaviour {
	private Hashtable InGameStoreItemsPrices;
	
	void Awake()
	{
		InGameStoreItemsPrices = new Hashtable();
		
		InGameStoreItemsPrices.Add("revive", "5J");
		InGameStoreItemsPrices.Add("fiveHealth", "200C");
		InGameStoreItemsPrices.Add("fiveMana", "400C");
		InGameStoreItemsPrices.Add("autoHeal", "5J");
		InGameStoreItemsPrices.Add("extraLargeHealth", "2J");
		InGameStoreItemsPrices.Add("extraLargeMana", "2500C");
		InGameStoreItemsPrices.Add("largeMana", "1200C");
		InGameStoreItemsPrices.Add("largeHealth", "1500C");
		InGameStoreItemsPrices.Add("mediumMana", "500C");
		InGameStoreItemsPrices.Add("mediumHealth", "500C");
		InGameStoreItemsPrices.Add("smallMana", "200C");
		InGameStoreItemsPrices.Add("xpMult", "15J");
		//InGameStoreItemsPrices.Add("ManaBoost", "5J");
	}
	
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	public int GetItemPrice(string itemName)
	{
		string stringItemPrice = (string)InGameStoreItemsPrices[itemName];
		string trimmedItemPrice = stringItemPrice.Substring(0, stringItemPrice.Length - 1);
		
		int itemPrice = int.Parse(trimmedItemPrice);
		
		return itemPrice;
	}
	
	public string GetItemPriceType(string itemName)
	{
		string stringItemPrice = (string)InGameStoreItemsPrices[itemName];
		string itemPriceType = stringItemPrice.Substring(stringItemPrice.Length - 1, 1);
		return itemPriceType;
	}
}
