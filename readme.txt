=== Mm Ajax Login ===
Contributors:      MIGHTYminnow, Braad
Donate link:       http://wordpress.org/plugins/mm-ajax-login
Tags:              ajax, login, form, lightbox
Requires at least: 3.8
Tested up to:      4.3
Stable tag:        1.0.0
License:           GPLv2 or later
License URI:       http://www.gnu.org/licenses/gpl-2.0.html

A custom lightbox login form that uses ajax and can be triggered by clicking any link with the class "ajax-login-trigger"

== Description ==

This plugin allows you to create special links that check whether a user is logged in and show an ajax-powered login form in a simple lightbox if they are not. Once the user fills out the login form with valid credentials they will be logged in and redirected to the page the link points to.

= Example =

Let's say you've got a page on your site 'My Account' that only logged in users are able to access, and when a user who is not logged in visits the page, they see a standard login form and must login to see the page content. With this plugin you could add the class 'ajax-login-trigger' to all the links that point to that page, then when a user clicks one of these links an ajax request is sent to the server to check whether the user is already logged in, and if they are the user is redirected to the page without ever noticing that the login check was done.

If the user isn't already logged in, they'll see a login form appear in a simple lightbox. When the user fills out the form, a second ajax request is sent to the server to attempt to log them in, and if successful the user is redirected to the page.

= Customize It! =

This plugin includes a bunch of hooks and filters that allow for all sorts of customizations and unique use cases. Here's a quick list:

Actions:

	mm_ajax_login_before_form_outside
	mm_ajax_login_before_form_inside
	mm_ajax_login_extra_buttons
	mm_ajax_login_after_form_inside
	mm_ajax_login_after_form_outside

Filters:

	mm_ajax_login_trigger_selector
	mm_ajax_login_form_title
	mm_ajax_login_status_message
	mm_ajax_login_username_label
	mm_ajax_login_password_label
	mm_ajax_login_rememberme_text
	mm_ajax_login_lost_password_text
	mm_ajax_login_button_text
	mm_ajax_login_custom_login_action
	mm_ajax_login_email_login_fail_message
	mm_ajax_login_success_message
	mm_ajax_login_fail_message
	mm_ajax_login_allow_email_login

Many things are possible with these hooks. The hooks `mm_ajax_login_before_form_inside` and `mm_ajax_login_after_form_inside` allow you to add any custom input elements to the form. When the login form is submitted all of the values from the input elements included in the form will get passed to the PHP function that processes the ajax request, which will then pass the data to the `mm_ajax_login_custom_login_action` filter. You can intercept the incoming data using this filter and proceed with any custom action you want, like registering new users and logging them in during the same action.

== Installation ==

= Manual Installation =

1. Upload the entire /mm-ajax-login directory to the /wp-content/plugins/ directory.
2. Activate Mm Ajax Login through the 'Plugins' menu in WordPress.

= Better Installation =

1. Go to Plugins > Add New in your WordPress admin and search for Mm Ajax Login.
2. Click Install.

== Frequently Asked Questions ==

= Can the form be styled? =

Yes! The default CSS is designed to be minimal and work with the existing styles included in your theme, but you can write addition CSS to take full control over the look of the form.

== Screenshots ==

Coming Soon...

== Changelog ==

= 1.0.0 =
* First release

== Upgrade Notice ==

= 1.0.0 =
First Release