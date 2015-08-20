/**
 * Mm Ajax Login JS
 */

( function( $ ) {

	// Grab the trigger selector.
	var selector = mm_ajax_login_vars.selector;

	// Open the ajax modal when a trigger link is clicked.
	$( selector ).on( 'click', function( event ) {

		// Don't follow the link if our class is on an anchor.
		event.preventDefault();

		// Store the url to redirect to after login
		var redirectUrl = $( this ).attr( 'href' );

		// Check whether the user is logged in and proceed from there.
		mmAjaxLoginCheckIsUserLoggedIn( redirectUrl );
	});

	// Close the ajax modal when either the close button or the overlay is clicked.
	$( '.mm-ajax-login, .mm-ajax-login .close-button' ).on( 'click keyup', function( event ) {

		if ( event.target == this || event.target.className == 'close-button' || event.keyCode == 27 ) {
			$( this ).removeClass( 'open visible' );
			$( '.mm-ajax-login-inner' ).removeClass( 'visible' );
		}
	});

	// Trigger the form to submit when the Login button is clicked.
	// We need to do this manually rather than use <input type="submit" />
	// in the form because we want to allow extra inputs to be added
	// that might inject custom data into the form before submitting.
	$( '#mm-ajax-login-submit-button' ).on( 'click', mmAjaxLoginSubmitForm );

	// Submit the form via AJAX.
	$( '#mm-ajax-login-form' ).on( 'submit', mmAjaxLoginDoAjax );

	// Function to trigger form submission.
	function mmAjaxLoginSubmitForm() {
		$( '#mm-ajax-login-form' ).trigger( 'submit' );
	}

	// Function to do the vertical centering.
	function mmAjaxLoginVerticalCenter( selector, offset ) {

		// Scope the vars.
		var $this, parentHeight, marginTop;

		// Store the passed in selector.
		$this = $( selector );

		// Grab the wrapper's height.
		parentHeight = $this.parent().height();

		// Calculate and add the margin-top to center the element if it is a positive value.
		marginTop = ( ( parentHeight - $this.outerHeight() ) / 2 ) + parseInt( offset );
		if ( 0 > marginTop ) {
			marginTop = 15;
		}
		$this.css( 'margin-top', marginTop ).addClass( 'visible' );
	}

	// Check whether the user is currently logged in.
	function mmAjaxLoginCheckIsUserLoggedIn( redirectUrl ) {

		var nonce, data;

		// Grab the nonce value from the form.
		nonce = $( '#mm-ajax-login-form #_wpnonce' ).attr( 'value' );

		// Build the AJAX data.
		data = {
			'action': 'mm_is_user_logged_in',
			'nonce' : nonce
		};

		// Make the AJAX request.
		$.post( mm_ajax_login_vars.ajax_url, data, function( response ) {

			// If the user is already logged in, follow the clicked link,
			// otherwise show the login form.
			if ( response == 'yes' ) {
				window.location.href = redirectUrl;
			} else {
				mmAjaxLoginShowLoginForm( redirectUrl );
			}
		});
	}

	function mmAjaxLoginShowLoginForm( redirectUrl ) {

		// Store the ajax modal DOM reference.
		var $modal = $( '.mm-ajax-login' );

		// Position the ajax modal overlay.
		$modal.addClass( 'open' );

		// Vertically-center the ajax modal.
		mmAjaxLoginVerticalCenter( '.mm-ajax-login-inner', 0 );

		// Fade in the login modal.
		$modal.addClass( 'visible' );

		// Bring focus to the ajax input.
		$modal.find( 'input[type="text"]' ).focus();

		// Store the redirect URL in the form.
		$( '#mm-ajax-login-form' ).append( '<input id="mm-ajax-login-redirect-url" type="hidden" value="' + redirectUrl + '" />' );
	}

	// Attempt to sign the user in.
	function mmAjaxLoginDoAjax( event ) {

		// Prevent normal form submission behavior.
		event.preventDefault();

		// Update the status message.
		$( '#mm-ajax-login-status' ).text( mm_ajax_login_vars.status_message ).addClass( 'visible' );

		// Grab the redirect URL.
		var redirectUrl = $( '#mm-ajax-login-redirect-url' ).attr( 'value' );

		// Build our AJAX data.
		var data = {
			'action'   : 'mm_do_ajax_login',
			'data'     : $( '#mm-ajax-login-form' ).serialize(),
			'nonce'    : $( '#mm-ajax-login-form #_wpnonce' ).attr( 'value' )
		}

		// Make the AJAX request.
		$.post( mm_ajax_login_vars.ajax_url, data, function( response ) {

			// Convert the response into an object.
			var responseObj = $.parseJSON( response );

			// Update the status message.
			$( '#mm-ajax-login-status' ).text( responseObj.message );

			// Redirect if login was successful.
			if ( true === responseObj.logged_in ) {
				window.location.href = redirectUrl;
			}
		});
	}

})( jQuery );

