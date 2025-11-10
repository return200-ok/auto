class Part {
  final int partId;
  final int categoryId;
  final String? oemNumber;
  final String? aftermarketNumber;
  final String? brand;
  final String name;
  final String? description;
  final Map<String, dynamic>? specs;
  final String? imageUrl;

  Part({
    required this.partId,
    required this.categoryId,
    this.oemNumber,
    this.aftermarketNumber,
    this.brand,
    required this.name,
    this.description,
    this.specs,
    this.imageUrl,
  });

  factory Part.fromJson(Map<String, dynamic> json) {
    return Part(
      partId: json['part_id'],
      categoryId: json['category_id'],
      oemNumber: json['oem_number'],
      aftermarketNumber: json['aftermarket_number'],
      brand: json['brand'],
      name: json['name'],
      description: json['description'],
      specs: json['specs'],
      imageUrl: json['image_url'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'part_id': partId,
      'category_id': categoryId,
      'oem_number': oemNumber,
      'aftermarket_number': aftermarketNumber,
      'brand': brand,
      'name': name,
      'description': description,
      'specs': specs,
      'image_url': imageUrl,
    };
  }
}

