import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Volunteer, VolunteerDocument, VolunteerSection } from './schemas/volunteer.schema';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';

@Injectable()
export class VolunteersService {
  constructor(
    @InjectModel(Volunteer.name)
    private volunteerModel: Model<VolunteerDocument>,
  ) {}

  async create(createVolunteerDto: CreateVolunteerDto): Promise<Volunteer> {
    const volunteer = new this.volunteerModel(createVolunteerDto);
    return await volunteer.save();
  }

  async findAll(section?: VolunteerSection): Promise<Volunteer[]> {
    const filter = section ? { section } : {};
    return await this.volunteerModel
      .find(filter)
      .sort({ registeredAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<Volunteer> {
    const volunteer = await this.volunteerModel.findById(id).exec();
    if (!volunteer) {
      throw new NotFoundException(`Volunteer with ID ${id} not found`);
    }
    return volunteer;
  }

  async remove(id: string): Promise<void> {
    const result = await this.volunteerModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Volunteer with ID ${id} not found`);
    }
  }

  async getStatistics() {
    const total = await this.volunteerModel.countDocuments().exec();
    const bornAgainCount = await this.volunteerModel
      .countDocuments({ isBornAgain: true })
      .exec();

    // Agrégation pour compter par section
    const sectionCounts = await this.volunteerModel.aggregate([
      {
        $group: {
          _id: '$section',
          count: { $sum: 1 }
        }
      }
    ]);

    const sectionCountsObj = sectionCounts.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    return {
      total,
      bornAgainCount,
      bornAgainPercentage: total > 0 ? Math.round((bornAgainCount / total) * 100) : 0,
      sectionCounts: sectionCountsObj,
    };
  }
}