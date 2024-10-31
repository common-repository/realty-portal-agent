<?php
/**
 * RP_Agent_Config_Dashboard_Setting Class
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( ! class_exists( 'RP_Agent_Config_Dashboard_Setting' ) ) :

	class RP_Agent_Config_Dashboard_Setting {

		/**
		 *    Initialize class
		 */
		public function __construct() {
			add_filter( 'RP_Tab_Setting/Config', 'RP_Agent_Config_Dashboard_Setting::setting_agent', 10 );
			add_action( 'RP_Tab_Setting_Content/Config_After', 'RP_Agent_Config_Dashboard_Setting::form_setting', 25 );
            add_filter('rp_quick_setup_list_page', array($this, 'quick_setup_page'), 10);
		}

		/**
		 * Show html setting agent
		 *
		 * @param $list_tab
		 *
		 * @return array
		 */
		public static function setting_agent( $list_tab ) {

			$list_tab[] = array(
				'name'     => esc_html__( 'Agents', 'realty-portal-agent' ),
				'id'       => 'tab-setting-agent',
				'position' => 10,
			);

			return $list_tab;
		}

		/**
		 * Show form setting
		 */
		public static function form_setting() {

			rp_render_form_setting( array(
				'title'   => esc_html__( 'Agent Setting', 'realty-portal-agent' ),
				'name'    => 'agent_setting',
				'id_form' => 'tab-setting-agent',
				'fields'  => apply_filters( 'rp_agent_form_setting', array(
					array(
						'title'  => esc_html__( 'Agent Archive Base (slug)', 'realty-portal-agent' ),
						'name'   => 'archive_slug',
						'type'   => 'text',
						'std'    => 'agent',
						'notice' => sprintf( __( 'This option will affect the URL structure on your site. If you made change on it and see an 404 Error, you will have to go to <a target="_blank" href="%s">Permalink Settings</a> and click "<strong>Save Changes</strong>" button for reseting WordPress link structure.', 'realty-portal-agent' ), esc_url( admin_url( '/options-permalink.php' ) ) ),
					),
					array(
						'title' => esc_html__( 'Agent Category Base (slug)', 'realty-portal-agent' ),
						'name'  => 'agent_category_slug',
						'type'  => 'text',
						'std'   => 'agent_category',
					),
					array(
						'name' => 'agent_linebreak',
						'type' => 'line',
					),
					array(
						'title' => esc_html__( 'Only Show Agent with Property', 'realty-portal-agent' ),
						'name'  => 'agent_must_has_property',
						'type'  => 'checkbox',
						'label' => esc_html__( 'If selected, only agent with at least one property can be show on Agent listing.', 'realty-portal-agent' ),
					),
					array(
						'title' => '',
						'name'  => 'line',
						'type'  => 'line',
					),
					array(
						'title' => esc_html__( 'Saved Search', 'realty-portal-agent' ),
						'name'  => 'page_saved_search',
						'type'  => 'pages',
					),
				) ),
			) );
		}
        public function quick_setup_page($list_page)
        {
            $agent_page = array(
                array(
                    'group' => 'agent_setting',
                    'name' => 'page_submit_property',
                    'label' => esc_html__('Submit Property', 'realty-portal'),
                    'content' => '[rp_submit_property]',
                ),
                array(
                    'group' => 'agent_setting',
                    'name' => 'page_member',
                    'label' => esc_html__('Login/Register', 'realty-portal'),
                    'content' => '[rp_member]',
                ),
                // array(
                //     'group' => 'agent_setting',
                //     'name' => 'page_redirect',
                //     'label' => esc_html__('Redirects after login', 'realty-portal'),
                //     'content' => 'Redirects after login',
                //     'is_no_shortcode' => true,
                // ),
                array(
                    'group' => 'agent_setting',
                    'name' => 'page_agent_dashboard',
                    'label' => esc_html__('Agent Dashboard', 'realty-portal'),
                    'content' => '[rp_agent_dashboard]',
                ),
                 array(
                    'group' => 'agent_setting',
                    'name' => 'membership_page',
                    'label' => esc_html__('Pricing Package', 'realty-portal'),
                    'content' => '[rp_pricing_table]',
                ),
                array(
                    'group' => 'agent_setting',
                    'name' => 'page_term_of_service',
                    'label' => esc_html__('Term of Service', 'realty-portal'),
                    'content' => esc_html__('Term of Service', 'realty-portal'),
                    'is_no_shortcode' => true,
                ),
                array(
                    'group' => 'agent_setting',
                    'name' => 'page_agent_profile',
                    'label' => esc_html__('Agent Profile', 'realty-portal'),
                    'content' => '[rp_agent_profile]',
                ),
                array(
                    'group' => 'agent_setting',
                    'name' => 'payment_history_page',
                    'label' => esc_html__('Payment History', 'realty-portal'),
                    'content' => '[rp_payment_history]',
                ),
                array(
                    'group' => 'agent_setting',
                    'name' => 'page_compare_properties',
                    'label' => esc_html__('Page Compare', 'realty-portal'),
                    'content' => '[rp_compare]',
                    'current' => 0,
                ),
                array(
                    'group' => 'agent_setting',
                    'name' => 'page_my_favorites',
                    'label' => esc_html__('My Favorites', 'realty-portal'),
                    'content' => '[rp_my_favorites]',
                ),
                array(
                    'group' => 'agent_setting',
                    'name' => 'page_saved_search',
                    'label' => esc_html__('Saved Search', 'realty-portal'),
                    'content' => '[rp_saved_search]',
                ),
                array(
                    'group' => 'agent_setting',
                    'name' => 'page_request_viewings',
                    'label' => esc_html__('Request Viewings', 'realty-portal'),
                    'content' => '[rp_request_viewing]',
                ),
            );

            $agent_page = array_merge($agent_page, $list_page);
            return $agent_page;

        }


    }

	new RP_Agent_Config_Dashboard_Setting();

endif;