public var playerInArea : boolean = false;

function OnTriggerEnter()
{
	playerInArea = true;
}

function OnTriggerExit()
{
	playerInArea = false;
}