using UnityEngine;
using System.Collections;


public class MagicsPrices : MonoBehaviour {
	private Hashtable magicsCoinsPrice;
	private Hashtable magicsJewelsPrice;
	private Hashtable magicsBaseUpgradesPrice;
	
	public MagicsPrices()
	{
		magicsCoinsPrice = new Hashtable();
		magicsJewelsPrice = new Hashtable();
		magicsBaseUpgradesPrice = new Hashtable();
	}
	
	void Awake()
	{

	}
	
	public void AddMagicCoinsPrice(string magicName, int coinsPrice)
	{
		Debug.Log(magicsCoinsPrice);
		magicsCoinsPrice.Add(magicName, coinsPrice);	
	}
	
	public void AddMagicJewelsPrice(string magicName, int jewelsPrice)
	{
		magicsJewelsPrice.Add(magicName, jewelsPrice);	
	}
	
	public int GetMagicCoinsPrice(string magicName)
	{
		return (int)magicsCoinsPrice[magicName];	
	}
	
	public int GetMagicJewelsPrice(string magicName)
	{
		return (int)magicsJewelsPrice[magicName];	
	}
	
	public void AddMagicBaseUpgradePrice(string magicName, int coinsPrice)
	{
		magicsBaseUpgradesPrice.Add(magicName, coinsPrice);	
	}
	
	public int GetMagicBaseUpgradePrice(string magicName)
	{
		return (int)magicsBaseUpgradesPrice[magicName];	
	}
}
