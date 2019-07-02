function init()
{
	localStorage.clear();
	sessionStorage.clear();
	localStorage.setItem('Logged', 'No');
	
	init_menus();
}

/* Top menu */

function init_menus()
{
	//menu_stay_on_top();
	menu_item_click();
}

function menu_stay_on_top()
{
	var offset = $('#top-menu').offset().top + 100;;
	var header = $('#top-menu'); // guardar o elemento na memoria para melhorar performance
	var topLogo = $('#top-logo');
	$(document).on('scroll', function () 
	{
		if (offset <= $(window).scrollTop()) 
		{
			header.addClass('fix-top-menu');
			topLogo.addClass('fix-top');
		} else {
			header.removeClass('fix-top-menu');
			topLogo.removeClass('fix-top');
		}
	});
}

/**
 * Add listeners to some elements on html
 */
function menu_item_click()
{
	$('#try-Login').on("click", function(){
		tryLogin()
	});
}

/**
 * Function responsible for attempting to authenticate a user
 */
function tryLogin()
{
	var email = $("#email_inline").val();
	var password = $("#password").val();

	if(email.lenght != 0)
	{
		var strMD5 = md5(email);
		if(strMD5 != "2374c2e6d897edc03cfa35a5cf5c0ca4")
		{
			M.toast({html: 'E-mail não cadastrado', classes: 'rounded error'});
		}
		else
		{
			var strPassMD5 = md5(password);
			if(strPassMD5 != "bf11c766042e70f1d44bef48a385de65")
			{
				M.toast({html: 'Senha incorreta, tente novamente', classes: 'rounded error'});
			}
			else
			{
				M.toast({html: 'Seja bem-vindo!', classes: 'rounded success'});
				setTimeout(loginMsg, 1000);
			}

		}
	}
}

function loginMsg(){
	const element =  document.querySelector('#login-card');
	element.classList.add('flipOutY');
	setTimeout(redirectLogin, 500);
}

function redirectLogin(){
	localStorage.setItem('Logged', 'Yes');
	window.location.href = 'dashboard.html';
}