<?php
/**
 * Field: Agent Social
 *
 * @package     Realty_Portal
 * @author      NooTeam <suppport@nootheme.com>
 * @version     1.0
 */
if ( ! function_exists( 'rp_render_agent_social_field' ) ) :

	function rp_render_agent_social_field( $field = array(), $value = null, $show_front_end = true ) {

		if ( empty( $field ) ) {
			return false;
		}

		$list_social = rp_get_list_social_agent();

		foreach ( $list_social as $social ) {
			$field[ 'name' ]  = $social[ 'id' ];
			$field[ 'title' ] = $social[ 'label' ];
			$field[ 'type' ]  = $social[ 'type' ];
			$field[ 'class' ] = $field[ 'class_child' ];

			$custom_fields_value = '';
			if ( ! empty( $field[ 'post_id' ] ) ) {
				$custom_fields_value = get_post_meta( $field[ 'post_id' ], $field[ 'name' ], true );
			}
			rp_create_element( $field, $custom_fields_value );
		}
	}

	rp_add_custom_field_type( 'agent_social', __( 'Agent Social', 'realty-portal-agent' ), array( 'form' => 'rp_render_agent_social_field' ), array(
		'can_search' => false,
		'is_system'  => true,
	) );
endif;

if ( ! function_exists( 'rp_agent_list_social' ) ) :

	function rp_agent_list_social( $agent_id ) {

		if ( empty( $agent_id ) ) {
			return false;
		}

		$list_social = rp_get_list_social_agent();
		if ( ! empty( $list_social ) ) {
			echo '<ul class="' . apply_filters( 'rp_agent_list_social_ul', 'rp-list-social', $list_social ) . '">';
			foreach ( $list_social as $item ) {
				$value_field = Realty_Portal::get_post_meta( $agent_id, $item[ 'id' ], '' );
				if ( empty( $value_field ) ) {
					continue;
				}
				echo '<li class="' . apply_filters( 'rp_agent_list_social_li', 'rp-list-social-' . str_replace( '_', '-', $item[ 'id' ] ), $item ) . '">';
				echo '<a href="' . $value_field . '">' . '<i class="' . apply_filters( 'rp_agent_list_social_icon', $item[ 'icon' ], $item ) . '"></i>' . '</a>';
				echo '</li>';
			}
			echo '</ul>';
		}

		return false;
	}

endif;