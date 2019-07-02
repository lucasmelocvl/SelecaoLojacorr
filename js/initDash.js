var usersArray = [
	{name:"Roberto", company:"Seguros Amaral YA", adress:"Rua desembargador westphalen 113"},
	{name:"Letícia", company:"Seguros Amaral YA", adress:"Rua desembargador westphalen 113"},
	{name:"Isaque", company:"Seguros Amaral YA", adress:"Rua desembargador westphalen 113"},
	{name:"Naomi", company:"Turismo Seguros CV", adress:"Rua pedro ivo 503"},
	{name:"Gustavo", company:"Turismo Seguros CV", adress:"Rua pedro ivo 503"},
	{name:"Carlos", company:"Turismo Seguros CV", adress:"Rua pedro ivo 503"},
	{name:"Rafaela", company:"Turismo Seguros CV", adress:"Rua pedro ivo 503"},
	{name:"Jessyka", company:"FinTech Fundos SA", adress:"Rua josé loureiro 376"},
	{name:"Maria", company:"FinTech Fundos SA", adress:"Rua josé loureiro 376"},
	{name:"Catarina", company:"FinTech Fundos SA", adress:"Rua josé loureiro 376"},
	{name:"Jheniffer", company:"CorrTrader Ltda", adress:"Rua comendador araujo 143"},
	{name:"Lucas", company:"CorrTrader Ltda", adress:"Rua comendador araujo 143"},
	{name:"Dagoberto", company:"CorrTrader Ltda", adress:"Rua comendador araujo 143"},
	{name:"Floriano", company:"Corretores KJ", adress:"Rua konrad adenauer 370"},
	{name:"Márcia", company:"Corretores KJ", adress:"Rua konrad adenauer 370"},
	{name:"Riquelme", company:"Corretores KJ", adress:"Rua konrad adenauer 370"},
	{name:"Marta", company:"Corretores KJ", adress:"Rua konrad adenauer 370"},
	{name:"Débora", company:"Seguros 4Sec", adress:"Rua sandália manzon 210"},
	{name:"Ana Paula", company:"Seguros 4Sec", adress:"Rua sandália manzon 210"},
	{name:"Paola", company:"Seguros 4Sec", adress:"Rua sandália manzon 210"},
];

function init()
{
    if(localStorage.getItem('Logged') == 'No'){
        setTimeout(function(){
			window.location.href = 'index.html';
		}, 2000);
    }else{
		$("#lockLayer").css({'display': 'none'});
	}
	
	$('.sidenav').sidenav();
	$('#search').focus(function(){
		$('#search-icon-i').css("color","black");
	});

	initAutoComplete();
	init_listUsers();
	init_menus();
}

function initModal(){
	$('.modal').modal();
	closeModal();
}

function initAutoComplete(){
	var arraySearch = getAutoCompleteArray();
	var arraySearchFormatted = prepareDataToComplete(arraySearch);
	$('input.search').autocomplete({
		data: arraySearchFormatted,
		onAutocomplete: function(txt) {
			update_listUsers(txt);
		},
		limit: 20
	});
}

function getAutoCompleteArray(){
	var names = new Array();
	var companies = new Array();
	var adresses = new Array();
	for(var i=0; i<usersArray.length; i++)
	{
		names[i] = usersArray[i].name;
		companies[i] = usersArray[i].company;
		adresses[i] = usersArray[i].adress;
	}

	$.merge(names, companies);
	$.merge(names, adresses);
	return names;
}

function prepareDataToComplete(arraySearch){
	var searchFormatted = new Array();
	for(var i=0; i<arraySearch.length; i++)
	{
		var name = arraySearch[i];
		searchFormatted[name] = null;
	}
	return searchFormatted;
}

function getListItemById(arraySearch, id){
	return arraySearch[id];
}

function init_listUsers(){
	$("#list-search").empty();
	for(var i=0; i<usersArray.length; i++)
	{
		var tr = document.createElement("tr");
		var tdName = document.createElement("td");
		tdName.innerHTML = usersArray[i].name;
		var tdCompany = document.createElement("td");
		tdCompany.innerHTML = usersArray[i].company;
		var tdAdress = document.createElement("td");
		tdAdress.innerHTML = usersArray[i].adress;
		tr.append(tdName, tdCompany, tdAdress);
		$("#list-search").append(tr);
	}
}

function update_listUsers(txt){
	$("#list-search").empty();
	for(var i=0; i<usersArray.length; i++)
	{
		if(txt==usersArray[i].name || txt==usersArray[i].company || txt==usersArray[i].adress){
			var tr = document.createElement("tr");
			var tdName = document.createElement("td");
			tdName.innerHTML = usersArray[i].name;
			var tdCompany = document.createElement("td");
			tdCompany.innerHTML = usersArray[i].company;
			var tdAdress = document.createElement("td");
			tdAdress.innerHTML = usersArray[i].adress;
			tr.append(tdName, tdCompany, tdAdress);
			$("#list-search").append(tr);
		}
	}
}

function init_menus()
{
	menu_item_click();
}

/**
 * Add listeners to some elements on html
 */
function menu_item_click()
{
	$('.logout-button').on("click", function(){
		tryLogout();
	});
	$('.create-user').on("click", function(){
		openModal();
	});
	$('#save-user').on("click", function(){
		newUser();
	});
	$('#cancel-user').on("click", function(){
		closeModal();
	});
}

/**
 * Function to add a new user
 */
function newUser(){
	var nameUser = $("#form_name").val();
	var companyUser = $("#form_company").val();
	var adressUser = $("#form_adress").val();

	if(nameUser.length != 0)
	{
		if(companyUser.length != 0)
		{
		
			if(adressUser.length != 0)
			{
				usersArray.push({name:nameUser, company:companyUser, adress:adressUser});
				initAutoComplete();
				init_listUsers();
				closeModal();
				M.toast({html: 'Usuário cadastrado com sucesso', classes: 'rounded success'});
			}
			else
			{
				M.toast({html: 'Endereço do usuário em branco', classes: 'rounded error'});
			}
		}
		else
		{
			M.toast({html: 'Empresa do usuário em branco', classes: 'rounded error'});
		}
	}
	else
	{
		M.toast({html: 'Nome do usuário em branco', classes: 'rounded error'});
	}

}

/**
 * Manually close the modal
 */
function closeModal(){
	$("#form_name").val("");
	$("#form_company").val("");
	$("#form_adress").val("");
	$("#addUser").css("display", "none");
	$("body").removeClass( "modal-open");
	$(".modal-backdrop").css("display", "none");
}

function openModal(){
	$("#addUser").css("display", "block");
	$("body").addClass( "modal-open");
	$(".modal-backdrop").css("display", "block");
}

/**
 * Function responsible for attempting to logout a user
 */
function tryLogout()
{
    localStorage.setItem('Logged', 'No');
    window.location.href = 'index.html';
}