import nx from "@nx/eslint-plugin";

export default [
    ...nx.configs["flat/base"],
    ...nx.configs["flat/typescript"],
    ...nx.configs["flat/javascript"],
    {
        ignores: [
            "**/dist",
            "**/out-tsc"
        ]
    },
    {
        files: [
            "**/*.ts",
            "**/*.tsx",
            "**/*.js",
            "**/*.jsx"
        ],
        rules: {
            "@nx/enforce-module-boundaries": [
                "error",
                {
                    enforceBuildableLibDependency: true,
                    allow: [
                        "^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$"
                    ],
                    depConstraints: [
                        // ── Apps: Can depend on everything ──
                        {
                            sourceTag: "scope:app",
                            onlyDependOnLibsWithTags: [
                                "scope:design-system",
                                "scope:features",
                                "scope:data-access",
                                "scope:shared",
                                "scope:ui"
                            ]
                        },
                        // ── Design System: ONLY depends on itself + shared ──
                        {
                            sourceTag: "scope:design-system",
                            onlyDependOnLibsWithTags: [
                                "scope:design-system",
                                "scope:shared"
                            ]
                        },
                        // ── Features: Can use design-system, data-access, shared, ui ──
                        {
                            sourceTag: "scope:features",
                            onlyDependOnLibsWithTags: [
                                "scope:design-system",
                                "scope:data-access",
                                "scope:shared",
                                "scope:ui",
                                "scope:features"
                            ]
                        },
                        // ── Data Access: Only shared ──
                        {
                            sourceTag: "scope:data-access",
                            onlyDependOnLibsWithTags: [
                                "scope:data-access",
                                "scope:shared"
                            ]
                        },
                        // ── UI: Design system + shared only ──
                        {
                            sourceTag: "scope:ui",
                            onlyDependOnLibsWithTags: [
                                "scope:design-system",
                                "scope:shared",
                                "scope:ui"
                            ]
                        },
                        // ── Shared: Only other shared libs ──
                        {
                            sourceTag: "scope:shared",
                            onlyDependOnLibsWithTags: [
                                "scope:shared"
                            ]
                        },
                        // ── Type-level constraints (second axis) ──
                        {
                            sourceTag: "type:ui",
                            onlyDependOnLibsWithTags: [
                                "type:ui",
                                "type:tokens",
                                "type:model",
                                "type:util"
                            ]
                        },
                        {
                            sourceTag: "type:feature",
                            onlyDependOnLibsWithTags: [
                                "type:ui",
                                "type:tokens",
                                "type:data-access",
                                "type:model",
                                "type:util",
                                "type:feature"
                            ]
                        },
                        {
                            sourceTag: "type:data-access",
                            onlyDependOnLibsWithTags: [
                                "type:data-access",
                                "type:model",
                                "type:util"
                            ]
                        },
                        {
                            sourceTag: "type:tokens",
                            onlyDependOnLibsWithTags: [
                                "type:tokens",
                                "type:util"
                            ]
                        },
                        {
                            sourceTag: "type:model",
                            onlyDependOnLibsWithTags: [
                                "type:model",
                                "type:util"
                            ]
                        },
                        {
                            sourceTag: "type:util",
                            onlyDependOnLibsWithTags: [
                                "type:util"
                            ]
                        },
                        {
                            sourceTag: "type:app",
                            onlyDependOnLibsWithTags: [
                                "type:feature",
                                "type:ui",
                                "type:tokens",
                                "type:data-access",
                                "type:model",
                                "type:util"
                            ]
                        }
                    ]
                }
            ]
        }
    },
    {
        files: [
            "**/*.ts",
            "**/*.tsx",
            "**/*.cts",
            "**/*.mts",
            "**/*.js",
            "**/*.jsx",
            "**/*.cjs",
            "**/*.mjs"
        ],
        // Override or add rules here
        rules: {}
    }
];
