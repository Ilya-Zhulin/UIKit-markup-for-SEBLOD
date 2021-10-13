<?php

/**
 * @version 			SEBLOD 3.x Core
 * @package			SEBLOD (App Builder & CCK) // SEBLOD nano (Form Builder)
 * @url				http://www.seblod.com
 * @editor			Octopoos - www.octopoos.com
 * @copyright		Copyright (C) 2013 SEBLOD. All Rights Reserved.
 * @license 			GNU General Public License version 2 or later; see _LICENSE.php
 * */
defined('_JEXEC') or die;

// The markup around each field (label+value/form) can be Overridden.
// Remove the underscore [_] from the Filename. (filename = markup.php)
// Edit the function name:
//	- fields/markup.php 			=>	cckMarkup_[template]
//	- fields/[contenttype]/markup.php	=>	cckMarkup_[template]_[contenttype]
//	- fields/[searchtype]/markup.php	=>	cckMarkup_[template]_[searchtype]
// Write your Custom Markup code. (see default markup below)
// cckMarkup

function cckMarkup_seb_minima($cck, $html, $field, $options) {
	$desc		 = '';
	$addAttr	 = '';
	$addClass	 = '';
	$layout		 = '0';
	if (stripos($cck->id_class, 'uk-form-stacked') !== FALSE) {
		$layout = '1';
	} elseif (stripos($cck->id_class, 'uk-form-horizontal') !== FALSE) {
		$layout = '2';
	}

// Computation

	if (isset($field->computation) && $field->computation) {
		$cck->setComputationRules($field);
	}

// Conditional

	if (isset($field->conditional) && $field->conditional) {
		$cck->setConditionalStates($field);
	}

//	Description

	if ($cck->getStyleParam('field_description', 0)) {
		$desc = ( $field->description != '' ) ? '<div id="' . $cck->id . '_desc_' . $field->name . '" class="uk-text-small uk-form-controls cck_desc cck_desc_' . $field->type . '">' . $field->description . '</div>' : '';
	}

//	Label

	$label = '';
	if ($options->get('field_label', $cck->getStyleParam('field_label', 1))) {
		if (strpos($field->markup_class, 'tyres-label-ph') !== FALSE && ($field->type == 'text' || $field->type == 'textarea')) {
			$label	 = $cck->getLabel($field->name, false, ( $field->required ? '*' : ''));
			$html	 = ( $label != '' ) ? str_replace(array('<input', '<textarea'), array('<input placeholder="' . $label . '"', '<textarea placeholder="' . $label . '"'), $html) : $html;
			$label	 = '';
		} else {
			$label	 = $cck->getLabel($field->name, true, ( $field->required ? '*' : ''));
			$label	 = ( $label != '' ) ? str_replace('<label', '<label class="uk-form-label"', $label) : '';
		}
	}


//	Field Types

	switch ($field->type) {
		case 'checkbox':
			$html	 = str_replace(array('class="checkbox ', 'class="checkbox"'), array('class="uk-checkbox uk-margin-small-right ', 'class="uk-checkbox uk-margin-small-right"'), $html);
			$html	 = str_replace('class="checkboxes', 'class="uk-fieldset', $html);
			$html	 = str_replace('fieldset', 'div', $html);
			if (stripos($field->attributes, 'data-input-label') === FALSE) {
				$html	 = preg_replace("/(<label for=\"([^\"]*)\">)/u", "", $html);
				$html	 = preg_replace("/(<input[^>]*id=\"([^\"]*)\"[^>]*>)/u", "<label class='uk-margin-right' for='$2'>$1", $html);
			}
			break;
		case 'checkbox_dynamic':
			$html	 = preg_replace('/class=\"([^\"]*)(uk-input)([^\"]*)\"/', 'class="$1uk-checkbox uk-margin-right-small $3"', $html);
			$html	 = preg_replace('/label><input([^>]*optgroup[^>]*)><label([^>]*)>([^>]*label>)/', 'label><span class="uk-clearfix"></span><label class="uk-form-label uk-text-bold uk-clearfix">$3', $html);
			$html	 = preg_replace('/"><input([^>]*optgroup[^>]*)><label([^>]*)>([^>]*label>)/', '"><label class="uk-form-label uk-text-bold uk-clearfix">$3', $html);
			break;

		case 'textarea':
			$html = preg_replace('/class=\"([^\-"]*)(uk-input)([^\"]*)\"/', 'class="$1uk-textarea $3"', $html);
			break;

		case 'group_x':
			$html	 = preg_replace('/class=\\"([^\\"]*)(auto-expand)([^\\"]*)\\"/', 'uk-grid', $html);
			$html	 = preg_replace('/class=\\"([^\\"]*)(cck_cgx_button)([^\\"]*)\\"/', 'class="$1 uk-float-right uk-iconnav uk-margin-bottom $3"', $html);
			$html	 = preg_replace('/class=\\"([^\\"]*)(cck_cgx_form)([^\\"]*)\\"/', 'class="$1 uk-width-1-1 $3"', $html);
			$html	 = preg_replace('/class=\\"([^\\"]*)(uk-form-controls)([^\\"]*)\\"/', 'class="$1 uk-margin-remove-left $3"', $html);
			$html	 = preg_replace('/class=\\"([^\\"]*)(cck_form_group_x)([^\\"]*)\\"/', 'class="$1 uk-clearfix uk-margin $3"', $html);
			$html	 = preg_replace('/class=\\"([^\\"]*)(cck_wysiwyg_editor)([^\\"]*)\\"/', 'class="$1 uk-clearfix uk-margin1 $3"', $html);
			$html	 = str_replace('<input type="file"', '<div uk-form-custom="target: true" class="uk-form-custom uk-width-1-1"><input class="target uk-input uk-width-1-1" type="text" placeholder="Кликните, чтобы выбрать файл" disabled=""><input type="file', $html);
			$html	 = str_replace('<span class="hasTooltip" title="Check to delete the file">', '</div><span class="hasTooltip" title="Check to delete the file">', $html);
			// Inputs
			$html	 = preg_replace('/class=\"([^\"_]*)(text)([^\"]*)\"/', 'class="$1 uk-input $3"', $html);
			// Selects
			$html	 = preg_replace('/class=\"([^\-"]*)(select)([^\"]*)\"/', 'class="$1uk-select $3"', $html);
			// Labels
			$html	 = str_replace('<label', '<label class="uk-form-label"', $html);
			$html	 = preg_replace('/<div([^>]*)>(<label([^>]*)>([^<]*)<\/label>)<\/div>/', '$2', $html);
			$html	 = preg_replace('/<\/label><div([^>]*)class="([^\"]*)"/', '</label><div$1class="uk-form-controls $2"', $html);
			// GroupX
			$html	 = str_replace('<span class="icon-minus"></span>', '<li><a href="#" uk-icon="icon: minus-circle" class="uk-text-danger icon-minus"></a></li>', $html);
			$html	 = str_replace('<span class="icon-plus"></span>', '<li><a href="#" onclick="return false" uk-icon="icon: plus-circle" class="uk-text-success icon-plus"></a></li>', $html);
			$html	 = str_replace('<span class="icon-circle"></span>', '<li><a href="#" uk-icon="icon: move" class="uk-text-primary icon-circle"></a></li>', $html);
			$html	 = str_replace('aside', 'ul', $html);
			$html	 = preg_replace('/<div([^>]*)>(<label([^>]*)>([^<]*)<\/label>)<\/div>/', '$2', $html);
			$html	 = preg_replace('/<div([^>]*)>(<li>)(.*?)(<\/li>)<\/div>/si', '<li$1>$3</li>', $html);

			break;

		case 'radio':
			$html	 = str_replace('class="radio"', 'class="uk-radio"', $html);
			$html	 = str_replace('class="radios"', 'class="uk-margin uk-grid-small uk-child-width-auto uk-grid"', $html);
			$html	 = str_replace('fieldset', 'div', $html);
			if (stripos($field->attributes, 'data-input-label') === FALSE) {
				$html	 = preg_replace("/(<label for=\"([^\"]*)\">)/u", "", $html);
				$html	 = preg_replace("/(<input[^>]*id=\"([^\"]*)\"[^>]*>)/u", "<label for='$2'>$1 ", $html);
				$html	 = str_replace('</label>', '</label>', $html);
			}
			if ($label != '') {
				$html = '<div ' . $addAttr . 'class="uk-form-controls ' . $field->name . ' ' . $field->type . $addClass . '">' . $html . '</div>';
			} else {
				$html = '<div class="' . $field->name . ' ' . $field->type . $addClass . '">' . $html . '</div>';
			}
			break;

		case 'select_simple':
			$html = preg_replace('/class=\"([^\-"]*)(select)([^\"]*)\"/', 'class="$1uk-select $3"', $html);
			break;

		case 'text':
			$html = preg_replace('/class=\"([^\"]*)(text)([^\"]*)\"/', 'class="$1uk-input $3"', $html);
			break;

		case 'upload_image':
			$html	 = preg_replace('/class=\"([^\"]*)(input)([^\"]*)\"([^>])(type="checkbox")(.*)>/', 'class="$1uk-checkbox $3"$4$5$6>', $html);
			$html	 = preg_replace('/class=\"([^\"]*)(input)([^\"]*)\"/', 'class="$1uk-input $3"', $html);
			$html	 = str_replace(array('class="checkbox ', 'class="checkbox"'), array('class="uk-checkbox uk-margin-small-right ', 'class="uk-checkbox uk-margin-small-right"'), $html);
			$html	 = str_replace('class="checkboxes', 'class="uk-fieldset', $html);
			$html	 = str_replace('fieldset', 'div', $html);
			if (stripos($field->attributes, 'data-input-label') === FALSE) {
				$html	 = preg_replace("/(<label for=\"([^\"]*)\">)/u", "", $html);
				$html	 = preg_replace("/(<input[^>]*id=\"([^\"]*)\"[^>]*>)/u", "<label class='uk-margin-right' for='$2'>$1", $html);
			}
			break;
	}
// Fields layouts
	if ($layout > 0 && strlen($label) > 0) {
		$html = '<div class="uk-form-controls">' . $html . '</div>';
	}

	if (stripos($field->attributes, 'data-form-icon') !== FALSE && ($cck->client == 'site' || $cck->client == 'search')) {
		$attr	 = $field->attributes;
		$attr	 = str_replace(' ', '~', $attr);
		$attr	 = str_replace('"~', '" ', $attr);
		$attr	 = str_replace('~', ' ', $attr);
		$attrs	 = explode('" ', trim($attr));
		$icon	 = '';
		$flip	 = '';
		$tag	 = "span";
		$add	 = '';
		$tooltip = '';
		foreach ($attrs as $attrib) {
			if (stripos($attrib, 'data-form-icon') !== FALSE) {
				$vals = explode('=', trim($attrib));
				switch ($vals[0]) {
					case 'data-form-icon':
						$icon	 = (strlen($icon) > 0) ? $icon : str_replace('"', '', $vals[1]);
						break;
					case 'data-form-icon-tooltip':
						$tooltip = ' uk-tooltip title="' . str_replace('"', '', $vals[1]) . '"';
						break;
					case 'data-form-icon-flip':
						$flip	 = " uk-form-icon-flip";
						$icon	 = (strlen($icon) > 0) ? $icon : str_replace('"', '', $vals[1]);
						break;
					case 'data-form-icon-flip-a':
						$flip	 = " uk-form-icon-flip";
						$tag	 = "a";
						$add	 = " href='#'";
						$icon	 = (strlen($icon) > 0) ? $icon : str_replace('"', '', $vals[1]);
						break;
					case 'data-form-icon-a':
						$tag	 = "a";
						$add	 = " href='#'";
						$icon	 = (strlen($icon) > 0) ? $icon : str_replace('"', '', $vals[1]);
						break;
				}
			}
		}
		$html = '<div id="' . $cck->id . '_' . $cck->mode_property . '_' . $field->name . '" class="uk-inline uk-width-1-1"><' . $tag . $add .
				' class="uk-form-icon' . $flip . '" uk-icon="icon: ' . $icon . '"' . $tooltip . '></' . $tag .
				'>' . $html . '</div>';
	}


	$html = '<div id="' . $cck->id . '_' . $field->name . '"  class="uk-margin ' . $field->name . ' ' . $field->markup_class . '">' . $label . $html . $desc . '</div>';

	return $html;
}

?>
