/*
 * Build HPDE resource static web site from the XML descriptions.
 *
 * Copyright (c) 2020. Todd King and Regents of the University of California
 * Licensed under the Apache 2.0 license.
 */

 /*
 * Required modules
 *
 * npm install grunt-convert --save-dev
 * npm install grunt-xsltproc --save-dev
 * npm install grunt-contrib-clean --save-dev
 * npm install grunt-contrib-copy --save-dev
 *
 * To build everything
 *     grunt
 * To build the home page
 *     grunt homepage
 * To build listing (index) page for each folder
 *     grunt listing
 */

module.exports = function(grunt) {
	'use strict';

	// Load plug-ins
	// grunt.task.loadTasks('./tasks');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-assemble');
	grunt.loadNpmTasks('grunt-sitemap-xml');	
	
	// Configure tasks
	grunt.initConfig({
		site: {
			pages: grunt.option('pages') || 'site/pages',
			pregen: grunt.option('pregen') || 'site/pregen',
			helpers: grunt.option('helpers') || "site/helpers",
			dest: "docs",
			layout: "site/layout/default.hbs",
			config: "site/config",
			search: "site/search",
			title: "SPASE",
		},
		
		// Defined tasks
		
		// Copy pre-generated files to destination.
	    copy: {
			assets: {
			   files: [
				   {
					  expand: true,
					  cwd: '<%= site.pages %>', // set 'Current Working Directory'
					  src: ['assets/**',], // Source files
					  dest: '<%= site.dest %>/', // Destination folder
				   }
				]
			},
			docs: {
			   files: [
				   {
					  expand: true,
					  cwd: '<%= site.pages %>', // set 'Current Working Directory'
					  src: ['docs/**', '!docs/**/*.hbs'], // Source files
					  dest: '<%= site.dest %>/', // Destination folder
				   }
				]
			},
			pregen: {
			   files: [
				   {
					  expand: true,
					  cwd: '<%= site.pages %>', // set 'Current Working Directory'
					  src: ['**/*', '!**/*.hbs', '!docs/**'], // Source files
					  dest: '<%= site.dest %>/', // Destination folder
				   }
				]
			},			
			search: {
			   files: [
				   {
					  expand: true,
					  cwd: '<%= site.search %>', // set 'Current Working Directory'
					  src: ['**/*', ], // Source files
					  dest: '<%= site.dest %>/data/model/search', // Destination folder
				   },
				   {
					  expand: true,
					  cwd: '<%= site.search %>', // set 'Current Working Directory'
					  src: ['**/*', ], // Source files
					  dest: '<%= site.dest %>/data/simulation/search', // Destination folder
				   },
				]
			},
			config: {
			   files: [
				   {
					  src: '<%= site.config %>/baseModelVersions.json', // Source files
					  dest: '<%= site.dest %>/data/model/search/modelVersions.json', // Destination folder
				   },
				   {
					  src: '<%= site.config %>/baseSearchConfig.js', // Source files
					  dest: '<%= site.dest %>/data/model/search/config.js', // Destination folder
				   },
				   {
					  src: '<%= site.config %>/simulationExtVersions.json', // Source files
					  dest: '<%= site.dest %>/data/simulation/search/modelVersions.json', // Destination folder
				   },
				   {
					  src: '<%= site.config %>/simSearchConfig.js', // Source files
					  dest: '<%= site.dest %>/data/simulation/search/config.js', // Destination folder
				   }
				]
			},			
		},

		// Process all handlebar files (.hbs) in the site folder and write to destination.
		assemble: {
			options: {
				flatten: true,
				layout: '<%= site.layout %>',
				assets: '<%= site.dest %>',
				data: '<%= site.config %>/**/*.{json,yml}',
				helpers: ['<%= site.helpers %>/**/*.js']
			},
			pages: {
				files: [{
					expand: true,
					extDot: 'last',
					cwd: '<%= site.pages %>',
					src: ['**/*.hbs',],
					dest: '<%= site.dest %>/',
					// ext: '.html',
				}],
			}
		},

		// Create sitemap
		sitemap_xml: {
			build: {
				options: {
					siteRoot: 'https://spase-group.org',
					stripIndex: false,
					priority: 0.8,
					changeFreq: 'daily',
					pretty: true					
				},
				files: [
					{
						cwd: '<%= site.dest %>',
						src: ['**/*.html'],
						dest: '<%= site.dest %>/sitemap.xml'
					}
				]
			}	
		},

		// Remove any previously-created files from the destination folder and temporary folder
		clean: {
			build: ['<%= site.dest %>/**/*.html', '<%= site.dest %>/**/*.xml', '<%= site.dest %>/**/*.json'],
			temp: ['<%= site.temp %>']
		}		

	});

	// Define tasks. Task called "default" runs with no command line options
	
	// To "index_maker" before "convert" so that index does not include extra files.
	grunt.registerTask('default', ['copy', 'assemble', 'sitemap_xml']);
};
