#pragma strict
class MagicsManaTable extends MonoBehaviour
{
	private var magicsManaTable : Hashtable;
	
	function MagicsManaTable()
	{
		magicsManaTable = new Hashtable();
	}
	
	function AddMagicManaAmount(magicName : String, manaAmount : int)
	{
		magicsManaTable.Add(magicName, manaAmount);
	}
	
	
	function GetMagicManaAmount(magicName : String) : int
	{
		var magicMana : int = magicsManaTable[magicName];
		return magicMana;
	}
}


