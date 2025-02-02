(function ( $ ) {
	'use strict';

	$(document).on('click', '#menu-item-login', function ( event ) {

		var modal = new Custombox.modal({
			content: {
				target        : '#rp-box-login',
				effect        : 'flip',
				width         : 800,
				overlayOpacity: 0.8,
				position      : [
					'center',
					'top'
				]
			}
		});

		modal.open();
		event.preventDefault();
	});

	$(document).on('click', '#menu-item-register ', function ( event ) {

		var modal = new Custombox.modal({
			content: {
				target        : '#rp-box-register ',
				effect        : 'flip',
				width         : 800,
				overlayOpacity: 0.8,
				position      : [
					'center',
					'top'
				]
			}
		});

		modal.open();
		event.preventDefault();
	});

	$(document).ready(function () {
		/**
		 * Event register member
		 */

		$(document).on('click', '.rp-form-register .rp-button', function ( event ) {
			event.preventDefault();
			/**
			 * VAR
			 */
			var current_event  = $(this),
			    data = current_event.closest('.rp-form-register').serializeArray();

			data.push(
				{
					'name' : 'action',
					'value': 'rp_register_member'
				},
				{
					'name' : 'security',
					'value': RP_Agent.security
				}
			);

			/**
			 * Process data
			 */
			$.ajax({
				url       : RP_Agent.ajax_url,
				type      : 'POST',
				dataType  : 'json',
				data      : data,
				beforeSend: function () {
					current_event.find('>i').removeClass('hide');
					current_event.closest('.rp-register-member-action').find('.notice').html('').hide();
				},
				success   : function ( register_member ) {
					try {

						current_event.find('>i').addClass('hide');
						var status = register_member.status;

						current_event.closest('.rp-register-member-action').find('.notice').html(register_member.msg).show().addClass(status);

						if ( 'success' === status ) {

							$.notifyBar({
								cssClass: 'success',
								html    : register_member.message,
								position: "bottom"
							});

							setTimeout(function () {

								window.location.href = register_member.url_redirect;

							}, 3000);

						} else {

							$.notifyBar({
								cssClass: 'error',
								html    : register_member.message,
								position: "bottom"
							});

						}

					} catch ( err ) {
						$.notifyBar({
							cssClass: 'error',
							html    : err,
							position: "bottom"
						});
					}

				}
			});


		});

		/**
		 * Event login member
		 */

		$(document).on('click', '.rp-form-login .rp-button', function ( event ) {
			event.preventDefault();
			/**
			 * VAR
			 */
			var current_button_click = $(this),
			    data                 = current_button_click.closest('.rp-form-login').serializeArray();

			data.push(
				{
					'name' : 'action',
					'value': 'rp_login_member'
				},
				{
					'name' : 'security',
					'value': RP_Agent.security
				}
			);

			/**
			 * Process data
			 */
			$.ajax({
				url       : RP_Agent.ajax_url,
				type      : 'POST',
				dataType  : 'json',
				data      : data,
				beforeSend: function () {
					current_button_click.find('>i').removeClass('hide');
					current_button_click.find('.rp-item-wrap').removeClass('validate-error').find('.notice').hide();
					current_button_click.closest('.rp-login-member-action').find('.notice').html('').hide();

				},
				success   : function ( res ) {
					try {

						current_button_click.find('>i').addClass('hide');

						var status = res.status;

						if ( 'success' === status ) {

							$.notifyBar({
								cssClass: 'success',
								html    : res.message,
								position: "bottom"
							});

							setTimeout(function () {

								window.location.href = res.url_redirect;

							}, 3000);

						} else {

							$.notifyBar({
								cssClass: 'error',
								html    : res.message,
								position: "bottom"
							});

						}

					} catch ( err ) {
						$.notifyBar({
							cssClass: 'error',
							html    : err,
							position: "bottom"
						});
					}

				}
			});


		});

	});

	jQuery(document).ready(function ( $ ) {

		if ( $('.rp-box-contact-agent').length > 0 ) {

			$('.rp-box-contact-agent').each(function ( index, el ) {

				var $$ = $(this);
				$$.on('click', '.rp-submit', function ( event ) {
					event.preventDefault();
					var data = $$.serializeArray(),
						$_$  = $(this);

					data.push(
						{
							'name' : 'action',
							'value': 'rp_contact_agent'
						},
						{
							'name' : 'security',
							'value': RP_Agent.security
						}
					);

					$.ajax({
						url       : RP_Agent.ajax_url,
						type      : 'POST',
						dataType  : 'json',
						data      : data,
						beforeSend: function () {
							$_$.find('>i').removeClass('hide');
						},
						success   : function ( agent ) {
							$_$.find('>i').addClass('hide');

							$.notifyBar({
								cssClass: agent.status,
								html    : agent.message,
								position: "bottom"
							});

						}
					})

				});


			});

		}

		/**
		 * Process event property item
		 */
		var body = $('body');

		body.on('click', '.more-action .rp-event', function ( event ) {

			event.preventDefault();

			var current_event = $(this),
				pprocess      = current_event.data('process'),
				user_id       = current_event.data('user'),
				property_id   = current_event.data('id');

			/**
			 * Process event when click
			 */
			if ( 'remove' === pprocess ) {
				var cnf = confirm('Are you sure you want to delete Property ? Note, this operation can not be undone.');
				console.log(cnf);
				if (cnf == true ) {
					$.ajax({
						url       : RP_Agent.ajax_url,
						type      : 'POST',
						dataType  : 'json',
						data      : {
							action     : 'rp_agent_dashboard',
							security   : RP_Agent.security,
							type       : 'remove',
							property_id: property_id
						},
						beforeSend: function () {
							current_event.addClass('loadmore');
						},
						success  : function ( res ) {
							try {
								current_event.removeClass('loadmore');
								current_event.closest('.property-item').remove();
								current_event.closest('.property-item-dashboard').remove();
								$.notifyBar({
									cssClass: res.status,
									html    : res.message,
									position: "bottom"
								});
							} catch ( err ) {
								$.notifyBar({
									cssClass: "error",
									html    : err,
									position: "bottom"
								});
							}
						}
					})
				}
				else {
					return false;
				}

			} else if ( 'sold' === pprocess ) {

				$.ajax({
					url       : RP_Agent.ajax_url,
					type      : 'POST',
					dataType  : 'json',
					data      : {
						action     : 'rp_agent_dashboard',
						security   : RP_Agent.security,
						type       : 'sold',
						property_id: property_id
					},
					beforeSend: function () {
						current_event.addClass('loadmore');
					},
					success  : function () {
						try {
							if ( current_event.hasClass('unavailable') ) {
								current_event.removeClass('unavailable');
								current_event.closest('.property-item').find('.rp-thumbnail').removeClass('unavailable');
							} else {
								current_event.addClass('unavailable');
								current_event.closest('.property-item').find('.rp-thumbnail').addClass('unavailable');
							}
							current_event.removeClass('loadmore');
						} catch ( err ) {
							$.notifyBar({
								cssClass: "error",
								html    : err,
								position: "bottom"
							});
						}
					}
				})

			} else if ( 'featured' === pprocess ) {

				$.ajax({
					url       : RP_Agent.ajax_url,
					type      : 'POST',
					dataType  : 'json',
					data      : {
						action     : 'rp_agent_dashboard',
						security   : RP_Agent.security,
						type       : 'featured',
						property_id: property_id
					},
					beforeSend: function () {
						if ( current_event.hasClass('not-set-feauted') ) {
							$.notifyBar({
								cssClass: "error",
								html    : "The number of added featured properties exceeded the limit. Please upgrade a new package.!",
								position: "bottom"
							});

							return false;
						}
						current_event.addClass('loadmore');
					},
					success   : function ( featured ) {
						try {
							if ( featured.status === 'error' ) {
								current_event.addClass('not-set-feauted');
								return false;
							}

							if ( current_event.hasClass('is-featured') ) {
								current_event.removeClass('is-featured rp-icon-ion-ios-star');
								current_event.addClass('rp-icon-ion-ios-star-outline');
							} else {
								current_event.removeClass('rp-icon-ion-ios-star-outline');
								current_event.addClass('is-featured rp-icon-ion-ios-star');
							}

							current_event.removeClass('loadmore');

							$.notifyBar({
								cssClass: featured.status,
								html    : featured.message,
								position: "bottom"
							});

						} catch ( err ) {
							$.notifyBar({
								cssClass: "error",
								html    : err,
								position: "bottom"
							});
						}
					}
				})

			}

		});

		/**
		 * Process event on page user profile
		 */
		if ( $('.rp-user-profile').length > 0 ) {

			$('.rp-user-profile').on('click', 'button.rp-button', function ( event ) {
				event.preventDefault();
				/**
				 * VAR
				 */
				var $$   = $(this),
					data = $$.closest('form').serializeArray();

				data.push(
					{
						name : 'action',
						value: 'rp_user_profile'
					},
					{
						name : 'security',
						value: RP_Agent.security
					}
				);
				/**
				 * Process
				 */
				$.ajax({
					url       : RP_Agent.ajax_url,
					type      : 'POST',
					dataType  : 'json',
					data      : data,
					beforeSend: function () {
						$$.find('i').removeClass('hide');
					},
					success   : function ( data_profile ) {

						$$.find('i').addClass('success').removeClass('rp-icon-spin');

						setTimeout(function () {

							$$.find('i').addClass('hide rp-icon-spin').removeClass('success');

						}, 3000);

						$$.closest('form').find('.rp-notice').html(data_profile.msg).addClass(data_profile.status).show();

						if ( data_profile.status === 'error' ) {

							if ( typeof data_profile.class !== 'undefined' && data_profile.class !== '' ) {
								$('#' + data_profile.class).closest('.rp-item-wrap').addClass('validate-error');
							}

						}

						setTimeout(function () {
							$$.closest('form').focus();
						}, 1);

					}
				})

			});

		}

		/**
		 * Process event on page agent profile
		 */
		if ( $('.rp-agent-profile').length > 0 ) {

			$('.rp-agent-profile').on('click', 'button.rp-button', function ( event ) {
				event.preventDefault();
				/**
				 * VAR
				 */
				var $$   = $(this),
					data = $$.closest('form').serializeArray();

				data.push(
					{
						name : 'action',
						value: 'rp_agent_profile'
					},
					{
						name : 'security',
						value: RP_Agent.security
					}
				);
				/**
				 * Process
				 */
				$.ajax({
					url       : RP_Agent.ajax_url,
					type      : 'POST',
					dataType  : 'json',
					data      : data,
					beforeSend: function () {
						$$.find('i').removeClass('hide');
					},
					success   : function ( data_profile ) {

						$$.find('i').addClass('success').removeClass('rp-icon-spin');

						setTimeout(function () {

							$$.find('i').addClass('hide rp-icon-spin').removeClass('success');

						}, 3000);

						$.notifyBar({
							cssClass: data_profile.status,
							html    : data_profile.msg,
							position: "bottom"
						});

						setTimeout(function () {
							$$.closest('form').focus();
						}, 1);

					}
				})

			});

		}

		/**
		 * Process event loadmore property agent
		 */
		var load_more_property_agent = function () {
			if ( $('.loadmore-property-agent').length > 0 ) {

				$(document).on('click', '.loadmore-property-agent', function ( event ) {
					event.preventDefault();

					var current_event  = $(this),
						agent_id       = current_event.data('agent-id'),
						page_current   = current_event.data('page-current'),
						max_page       = current_event.data('max-page'),
						posts_per_page = current_event.data('posts-per-page');

					$.ajax({
						url       : RP_Agent.ajax_url,
						type      : "POST",
						dataType  : "json",
						data      : {
							action        : 'load_more_property_agent',
							security      : RP_Agent.security,
							agent_id      : agent_id,
							page_current  : page_current,
							max_page      : max_page,
							posts_per_page: posts_per_page,
						},
						beforeSend: function () {
						},
						success   : function ( property ) {
							try {
							    if ( 'success' == property.status ) {
							    	current_event.closest('.rp-property-agent').find('ul').append(property.html);
									current_event.data('page-current', page_current+1);
								} else if ( 'end' == property.status ) {
									$.notifyBar({
										cssClass: 'success',
										html    : 'Complete',
										position: "bottom"
									});
									current_event.hide();
								} else {
									$.notifyBar({
										cssClass: 'error',
										html    : property.message,
										position: "bottom"
									});
								}
							} catch (err) {
								$.notifyBar({
									cssClass: 'error',
									html    : err,
									position: "bottom"
								});
							}
						}
					});

				});

			}
		}
		load_more_property_agent();

	});
})
(jQuery);